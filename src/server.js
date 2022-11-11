//config inicial
require('dotenv').config();
var cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(cors())

const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASS);

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rotas da API personalizada
const rotaPessoaDb = require('./routes/cadastroExterno');

app.use('/db', rotaPessoaDb);

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/page/index.html');

})

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@api-challange.4ocpxz5.mongodb.net/?retryWrites=true&w=majority`)
    .then(() =>{
        console.log(`Conectados ao MongoDB e Aplicação Rodando na Rota : http://localhost:3001/`)
        app.listen(3001);
    })
    .catch((err) => {
        console.log(err);
    })