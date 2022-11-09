//config inicial
const express = require('express');
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rotas da api
const rotaPessoa = require('./routes/cadastroPessoa');
app.use('/pessoa', rotaPessoa);

app.get('/', (req, res) => {

    res.json({message: 'oi express'});

})

app.listen(3000)