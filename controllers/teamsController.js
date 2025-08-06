// controllers/teamsController.js
const { db } = require("../db/index.js");
const { teams } = require("../db/schema.js");
const { eq } = require("drizzle-orm");

// Retorna todos os times
async function getAllTeams(req, res) {
  try {
    const allTeams = await db.select().from(teams);
    return res.status(200).json(allTeams);
  } catch (error) {
    console.error("Erro ao buscar times:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Cria um novo time
async function createTeam(req, res) {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ error: "O nome do time é obrigatório" });
    }
    const newTeam = await db.insert(teams).values({ name, image }).returning();
    return res.status(201).json(newTeam[0]);
  } catch (error) {
    console.error("Erro ao criar time:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Exclui um time
async function deleteTeam(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID do time é obrigatório" });
    }
    const deletedTeams = await db
      .delete(teams)
      .where(eq(teams.id, Number(id)))
      .returning();
    if (deletedTeams.length === 0) {
      return res.status(404).json({ error: "Time não encontrado" });
    }
    return res
      .status(200)
      .json({ message: "Time excluído com sucesso", team: deletedTeams[0] });
  } catch (error) {
    console.error("Erro ao excluir time:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  getAllTeams,
  createTeam,
  deleteTeam,
};
