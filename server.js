const express = require('express');
const path = require('path');
const pessoa = require('./models/pessoa');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let pessoas = [];

app.get('/pessoas', (req, res) => {
  res.json(pessoas.map(p => p.toJSON()));
});

app.post('/pessoas', (req, res) => {
    const { nome, dataNacimento } = req.body;
    if (!nome || !dataNacimento) {
        return res.status(400).json
        ({ error: 'Nome e data de nascimento são obrigatórios.' });
    }  
    const Pessoa = new pessoa(nome, dataNacimento);
    pessoas.push(Pessoa);
    res.status(201).json(Pessoa.toJSON());
});  

app.delete('/pessoas/:id', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (Number.isNaN(index) || index < 0 || index >= pessoas.length) {
        return res.status(404).json({ error: 'pessoa nao encontrada.' });
    }
    pessoas.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});