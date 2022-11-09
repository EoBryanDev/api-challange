//config inicial
const express = require('express');
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rotas da API personalizada
const rotaPessoa = require('./routes/cadastroPessoa');
app.use('/pessoa', rotaPessoa);

app.get('/', (req, res) => {

    res.json({message: 'oi express'});

})


// para subir o servidor utilizar o comando => npm start. Assim subiremos o nodemon também para testes
app.listen(3000)