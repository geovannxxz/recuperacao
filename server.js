const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./geovanna.db');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/salvar', (req, res) => {
  const { nome, telefone, email } = req.body;

  const sql = `INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)`;

  db.run(sql, [nome, telefone, email], function(err) {
    if (err) return res.send("Erro: " + err.message);

    res.send("<h1>Sucesso!</h1><a href='/'>Voltar</a>");
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));