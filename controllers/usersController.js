const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

// Retorna todos os usuários
async function getAllUsers(req, res) {
  try {
    const allUsers = await userModel.findAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Cria um novo usuário
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Nome, email e senha são obrigatórios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createNewUser({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(newUser[0]);
  } catch (error) {
    // LÓGICA DE ERRO MELHORADA
    if (error.code === "23505") {
      // Código de erro do PostgreSQL para violação de unicidade
      return res.status(409).json({ error: "Este e-mail já está em uso." });
    }
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    // Capture o teamId do corpo da requisição
    const { name, email, password, teamId } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    // Crie um objeto para os dados de atualização
    let updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (teamId) updateData.teamId = teamId; // Adicione o teamId se ele existir

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userModel.updateExistingUser(id, updateData);

    if (updatedUser.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Exclui um usuário
async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const deletedUser = await userModel.deleteExistingUser(id);

    if (deletedUser.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({
      message: "Usuário excluído com sucesso",
      user: deletedUser[0],
    });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
