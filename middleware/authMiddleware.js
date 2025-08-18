const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Pega o token do cabeçalho da requisição
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: 'Bearer TOKEN'

  if (token == null) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso negado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado. Acesso negado.' });
    }
    req.user = user; // Adiciona os dados do usuário à requisição
    next(); // Continua para a próxima função (o controller)
  });
}

module.exports = authenticateToken;