// controllers/playersController.js
const playerModel = require("../models/playerModel.js"); // Importa o novo modelo de jogador

// Retorna todos os jogadores
async function getAllPlayers(req, res) {
  try {
    const allPlayers = await playerModel.findAllPlayers(); // Usa a função do modelo
    return res.status(200).json(allPlayers);
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Cria um novo jogador
async function createPlayer(req, res) {
  console.log("Received body:", req.body);
  try {
    const { name, teamId, position, image } = req.body;

    if (!name || !teamId) {
      return res
        .status(400)
        .json({ error: "Nome e ID do time são obrigatórios" });
    }

    const newPlayer = await playerModel.createNewPlayer({
      name,
      teamId,
      position,
      image,
    }); // Usa a função do modelo
    return res.status(201).json(newPlayer[0]);
  } catch (error) {
    console.error("Erro ao criar jogador:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Atualiza um jogador existente
async function updatePlayer(req, res) {
  try {
    const id = req.params.id;
    const { name, teamId, position, image } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID do jogador é obrigatório" });
    }

    const updatedPlayer = await playerModel.updateExistingPlayer(id, {
      name,
      teamId,
      position,
      image,
    }); // Usa a função do modelo

    if (updatedPlayer.length === 0) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }

    return res.status(200).json({
      message: "Jogador atualizado com sucesso",
      player: updatedPlayer[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar jogador:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Exclui um jogador
async function deletePlayer(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID do jogador é obrigatório" });
    }

    const deletedPlayer = await playerModel.deleteExistingPlayer(id); // Usa a função do modelo

    if (deletedPlayer.length === 0) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }

    return res.status(200).json({
      message: "Jogador excluído com sucesso",
      player: deletedPlayer[0],
    });
  } catch (error) {
    console.error("Erro ao excluir jogador:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  getAllPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
