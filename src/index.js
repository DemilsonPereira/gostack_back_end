const express = require('express');

const app = express();

app.use(express.json());

/**
 * Query Params: Filtros e Paginação / Usado no 'GET'
 * Route Params: Identificar recuros (Arualizar/Deletar) / Usado tanto no 'PUT'/'DELETE'
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)/ Usado tanto no 'POST'/'PUT'
 */
app.get('/projects', (req, res) => {
    // Obtendo valores dentro do Back através dos Query Params(query)
    // const query = req.query; //PEGANDO A QUERY SEM TRATAMAENTO
    const {title, owner} = req.query; //PEGANDO A QUERY NO FORMATO DE DESESTRUTURAÇÃO

    console.log(title);
    console.log(owner);

    return res.json([
        'Projeto 1',
        'Projeto 2'
    ]);
});

app.post('/projects', (req, res) => {
    // Creando valores dentro do Back através dos Request Body(body) /  Sempre verificar se tem a lib de 'JSON'
    // const body = req.body; //PEGANDO O BODY SEM TRATAMAENTO
    const {title, owner} = req.body;

    console.log(title)
    console.log(owner)

    return res.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.put('/projects/:id', (req, res) => {
    // EDITANDO UM VALOR ATRAVES DO SEU ID COM Route Params (params)
    // const params = req.params //PEGANDO O PARAMS SEM TRATAMAENTO
    const {id} = req.params //PEGANDO A PARAMS NO FORMATO DE DESESTRUTURAÇÃO

    console.log(id)

    return res.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.delete('/projects/:id', (req, res) => {
    return res.json([
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.listen(3333, () => {
    console.log('🚀 Back-end started!');
});