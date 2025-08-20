const express = require("express");
const router = express.Router();
const playersController = require("../controllers/playersController.js");
const authenticateToken = require("../middleware/authMiddleware.js");

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Rotas relacionadas a jogadores
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Retorna todos os jogadores
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jogadores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 10
 *                   name:
 *                     type: string
 *                     example: Lionel Messi
 *                   teamId:
 *                     type: integer
 *                     example: 3
 *                   position:
 *                     type: string
 *                     example: Forward
 *                   image:
 *                     type: string
 *                     example: https://meuservidor.com/images/messi.png
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */
router.get("/", authenticateToken, playersController.getAllPlayers);

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Cria um novo jogador
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - teamId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cristiano Ronaldo
 *               teamId:
 *                 type: integer
 *                 example: 5
 *               position:
 *                 type: string
 *                 example: Forward
 *               image:
 *                 type: string
 *                 example: https://meuservidor.com/images/ronaldo.png
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 11
 *                 name:
 *                   type: string
 *                   example: Cristiano Ronaldo
 *                 teamId:
 *                   type: integer
 *                   example: 5
 *                 position:
 *                   type: string
 *                   example: Forward
 *                 image:
 *                   type: string
 *                   example: https://meuservidor.com/images/ronaldo.png
 *       400:
 *         description: Dados inválidos
 */
router.post("/", authenticateToken, playersController.createPlayer);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Atualiza um jogador pelo ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Neymar Jr
 *               teamId:
 *                 type: integer
 *                 example: 7
 *               position:
 *                 type: string
 *                 example: Attacking Midfielder
 *               image:
 *                 type: string
 *                 example: https://meuservidor.com/images/neymar.png
 *     responses:
 *       200:
 *         description: Jogador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jogador atualizado com sucesso"
 *                 player:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     name:
 *                       type: string
 *                       example: Neymar Jr
 *                     teamId:
 *                       type: integer
 *                       example: 7
 *                     position:
 *                       type: string
 *                       example: Attacking Midfielder
 *                     image:
 *                       type: string
 *                       example: https://meuservidor.com/images/neymar.png
 *       404:
 *         description: Jogador não encontrado
 */
router.put("/:id", authenticateToken, playersController.updatePlayer);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Exclui um jogador pelo ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     responses:
 *       200:
 *         description: Jogador deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jogador excluído com sucesso"
 *                 player:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 15
 *                     name:
 *                       type: string
 *                       example: Kaká
 *                     teamId:
 *                       type: integer
 *                       example: 9
 *                     position:
 *                       type: string
 *                       example: Midfielder
 *                     image:
 *                       type: string
 *                       example: https://meuservidor.com/images/kaka.png
 *       404:
 *         description: Jogador não encontrado
 */
router.delete("/:id", authenticateToken, playersController.deletePlayer);

module.exports = router;
