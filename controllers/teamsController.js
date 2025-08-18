const teamModel = require("../models/teamModel.js"); // Importa o novo modelo de time

// Retorna todos os times
async function getAllTeams(req, res) {
  try {
    const allTeams = await teamModel.findAllTeams(); // Usa a função do modelo
    return res.status(200).json(allTeams);
  } catch (error) {
    console.error("Erro ao buscar times:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function getTeamById(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "ID do time é obrigatório" });

    const team = await teamModel.findTeamByIdWithPlayers(id);

    if (!team) return res.status(404).json({ error: "Time não encontrado" });

    return res.status(200).json(team);
  } catch (error) {
    console.error("Erro ao buscar time:", error);
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

    const newTeam = await teamModel.createNewTeam({ name, image }); // Usa a função do modelo
    return res.status(201).json(newTeam[0]);
  } catch (error) {
    console.error("Erro ao criar time:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Atualiza um time existente
async function updateTeam(req, res) {
  try {
    const id = req.params.id;
    const { name, image } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID do time é obrigatório" });
    }

    const updatedTeam = await teamModel.updateExistingTeam(id, { name, image }); // Usa a função do modelo

    if (updatedTeam.length === 0) {
      return res.status(404).json({ error: "Time não encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Time atualizado com sucesso", team: updatedTeam[0] });
  } catch (error) {
    console.error("Erro ao atualizar time:", error);
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

    const deletedTeam = await teamModel.deleteExistingTeam(id); // Usa a função do modelo

    if (deletedTeam.length === 0) {
      return res.status(404).json({ error: "Time não encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Time excluído com sucesso", team: deletedTeam[0] });
  } catch (error) {
    console.error("Erro ao excluir time:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
