// controllers/authController.js
const { createClient } = require("@supabase/supabase-js");
const { sign } = require("jsonwebtoken"); // Você precisará instalar 'jsonwebtoken': npm install jsonwebtoken

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Lógica de login de usuário
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase login error:", error.message);
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    if (data.user) {
      // Cria um token JWT para a sessão
      const token = sign(
        { id: data.user.id, email: data.user.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Login bem-sucedido!",
        user: { id: data.user.id, email: data.user.email },
        token,
      });
    }

    return res.status(401).json({ error: "Credenciais inválidas." });
  } catch (error) {
    console.error("Erro no processo de login:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

module.exports = {
  loginUser,
};
