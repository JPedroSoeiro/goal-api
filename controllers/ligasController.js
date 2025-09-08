const ligaModel = require("../models/ligaModel.js");

async function getAllLigas(req, res) {
  try {
    const allLigas = await ligaModel.findAllLigas();
    return res.status(200).json(allLigas);
  } catch (error) {
    console.error("Erro ao buscar ligas:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function createLiga(req, res) {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ error: "O nome da liga é obrigatório" });
    }
    const newLiga = await ligaModel.createNewLiga({ name, image });
    return res.status(201).json(newLiga[0]);
  } catch (error) {
    console.error("Erro ao criar liga:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function updateLiga(req, res) {
  try {
    const id = req.params.id;
    const { name, image } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID da liga é obrigatório" });
    }
    const updatedLiga = await ligaModel.updateExistingLiga(id, { name, image });
    if (updatedLiga.length === 0) {
      return res.status(404).json({ error: "Liga não encontrada" });
    }
    return res
      .status(200)
      .json({ message: "Liga atualizada com sucesso", liga: updatedLiga[0] });
  } catch (error) {
    console.error("Erro ao atualizar liga:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function deleteLiga(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID da liga é obrigatório" });
    }
    const deletedLiga = await ligaModel.deleteExistingLiga(id);
    if (deletedLiga.length === 0) {
      return res.status(404).json({ error: "Liga não encontrada" });
    }
    return res
      .status(200)
      .json({ message: "Liga excluída com sucesso", liga: deletedLiga[0] });
  } catch (error) {
    console.error("Erro ao excluir liga:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  getAllLigas,
  createLiga,
  updateLiga,
  deleteLiga,
};
