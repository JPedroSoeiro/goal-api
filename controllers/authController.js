// controllers/authController.js
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Importe a biblioteca bcrypt
const userModel = require("../models/userModel.js"); // Importe o seu userModel
const jwt = require("jsonwebtoken");
const { verify } = jwt; // adiciona isso

// Lógica de login de usuário usando a tabela 'users' própria
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    // 1. Buscar o usuário pelo email no seu banco de dados
    const usersFound = await userModel.findUserByEmail(email);
    const user = usersFound[0]; // O Drizzle retorna um array, pegue o primeiro

    if (!user) {
      console.error("Usuário não encontrado para o email:", email);
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // 2. Comparar a senha fornecida com a senha hasheada no banco de dados
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.error("Senha inválida");
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Cria um token JWT para a sessão
    const token = sign(
      { id: user.id, email: user.email, name: user.name }, // Inclua 'name' se quiser na sessão
      process.env.JWT_SECRET || "your-secret-key", // Use uma chave secreta forte do .env
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login bem-sucedido!",
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    console.error("Erro no processo de login:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

// Nova função para validar o token
async function validateToken(req, res) {
  try {
    const { token } = req.body; // Assume que o token é enviado no corpo da requisição

    if (!token) {
      return res
        .status(400)
        .json({ isValid: false, error: "Token não fornecido." });
    }

    // Verifica o token usando o mesmo segredo usado para assiná-lo
    // A função 'verify' é importada do 'jsonwebtoken'
    verify(
      token,
      process.env.JWT_SECRET || "your-secret-key",
      (err, decoded) => {
        if (err) {
          console.error("Erro na validação do token:", err.message);
          return res
            .status(200)
            .json({ isValid: false, error: "Token inválido ou expirado." });
        }
        // Se o token for válido, 'decoded' conterá o payload
        return res.status(200).json({ isValid: true, user: decoded });
      }
    );
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return res.status(500).json({
      isValid: false,
      error: "Erro interno do servidor ao validar token.",
    });
  }
}

module.exports = {
  loginUser,
  validateToken,
};
