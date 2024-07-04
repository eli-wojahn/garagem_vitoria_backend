const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(express.json());
app.use(middlewares);

// Roteamento de login
const users = [
  { id: 1, username: 'admin', password: 'admin', token: 'token1' },
  { id: 2, username: 'user2', password: 'pass2', token: 'token2' }
];

app.post('/auth/login', (req, res) => {
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
  if (user) {
    res.json({ token: user.token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Use o json-server como middleware
app.use('/api', router);

// Servir o frontend buildado se necessário
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
