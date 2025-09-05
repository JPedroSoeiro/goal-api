const playerModel = require("../models/playerModel.js");
const teamModel = require("../models/teamModel.js");
const ligaModel = require("../models/ligaModel.js");

async function getTotals(req, res) {
  try {
    const totalPlayers = (await playerModel.findAllPlayers()).length;
    const totalTeams = (await teamModel.findAllTeams()).length;
    const totalLigas = (await ligaModel.findAllLigas()).length;

    return res.status(200).json({
      totalPlayers,
      totalTeams,
      totalLigas,
    });
  } catch (error) {
    console.error("Erro ao buscar totais do dashboard:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  getTotals,
};
