const { db } = require("../db/index.js");
const { players } = require("../db/schema.js");
const { eq } = require("drizzle-orm");

// Retorna todos os jogadores
async function getAllPlayers(req, res) {
  try {
    const allPlayers = await db.select().from(players);
    return res.status(200).json(allPlayers);
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function createPlayer(req, res) {
  try {
    const { name, teamId, position, image } = req.body;
    if (!name || !teamId) {
      return res
        .status(400)
        .json({ error: "Nome e ID do time são obrigatórios" });
    }
    const newPlayer = await db
      .insert(players)
      .values({ name, teamId, position, image })
      .returning();
    return res.status(201).json(newPlayer[0]);
  } catch (error) {
    console.error("Erro ao criar jogador:", error);
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
    const deletedPlayers = await db
      .delete(players)
      .where(eq(players.id, Number(id)))
      .returning();
    if (deletedPlayers.length === 0) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }
    return res.status(200).json({
      message: "Jogador excluído com sucesso",
      player: deletedPlayers[0],
    });
  } catch (error) {
    console.error("Erro ao excluir jogador:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  getAllPlayers,
  createPlayer,
  deletePlayer,
};
