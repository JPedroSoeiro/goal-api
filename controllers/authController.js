// controllers/authController.js
const { sign, verify } = require("jsonwebtoken"); // Adicionado 'verify' que estava faltando
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel.js");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const usersFound = await userModel.findUserByEmail(email);
    const user = usersFound[0];

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      teamId: user.teamId,
    };

    const token = sign(
      userPayload,
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      message: "Login bem-sucedido!",
      user: userPayload,
      token,
    });
  } catch (error) {
    console.error("Erro no processo de login:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

async function validateToken(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ isValid: false, error: "Token não fornecido." });
    }

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
