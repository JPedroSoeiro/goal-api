import express from 'express';
import authRoutes from './auth'; // Exemplo: authRoutes.js com as rotas de autenticação
import playersRoutes from './players'; // playersRoutes.js com as rotas de jogadores
import teamsRoutes from './teams'; // teamsRoutes.js com as rotas de times
import usersRoutes from './users'; // usersRoutes.js com as rotas de usuários

const router = express.Router();

// Agrupa todas as rotas
router.use('/auth', authRoutes);
router.use('/players', playersRoutes);
router.use('/teams', teamsRoutes);
router.use('/users', usersRoutes);

export default router;