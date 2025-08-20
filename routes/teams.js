const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController.js");
const authenticateToken = require("../middleware/authMiddleware.js");

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API para gerenciamento de equipes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da equipe
 *         name:
 *           type: string
 *           description: Nome da equipe
 *         image:
 *           type: string
 *           description: URL da imagem do time
 *           example: "https://meuservidor.com/barcelona.png"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da equipe
 *       example:
 *         id: "123"
 *         name: "Equipe de Desenvolvimento"
 *         image: "https://meuservidor.com/devteam.png"
 *         createdAt: "2025-08-18T12:00:00.000Z"
 */

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Lista todas as equipes
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de equipes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get("/", authenticateToken, teamsController.getAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Retorna um time específico com todos os jogadores
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do time
 *     responses:
 *       200:
 *         description: Time encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamWithPlayers'
 *       400:
 *         description: ID do time não fornecido
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Time não encontrado
 */
router.get("/:id", authenticateToken, teamsController.getTeamById);

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Cria uma nova equipe
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Barcelona"
 *               image:
 *                 type: string
 *                 example: "https://meuservidor.com/barcelona.png"
 *     responses:
 *       201:
 *         description: Equipe criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post("/", authenticateToken, teamsController.createTeam);

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Atualiza uma equipe existente
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da equipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Barcelona Atualizado"
 *               image:
 *                 type: string
 *                 example: "https://meuservidor.com/barcelona-novo.png"
 *     responses:
 *       200:
 *         description: Equipe atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Time atualizado com sucesso"
 *                 team:
 *                   $ref: '#/components/schemas/Team'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Equipe não encontrada
 */
router.put("/:id", authenticateToken, teamsController.updateTeam);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Remove uma equipe
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da equipe
 *     responses:
 *       200:
 *         description: Equipe removida com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Equipe não encontrada
 */
router.delete("/:id", authenticateToken, teamsController.deleteTeam);

module.exports = router;
