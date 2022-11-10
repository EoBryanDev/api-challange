//config inicial
//require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
const app = express();

//const DB_USER = process.env.DB_USER;
//const DB_PASS = encodeURIComponent(process.env.DB_PASS);


app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rotas da API personalizada
const rotaPessoa = require('./routes/cadastroPessoa');
const rotaPessoaExterno = require('./routes/cadastroExterno');

app.use('/pessoa', rotaPessoa);
app.use('/externo', rotaPessoaExterno);


app.get('/', (req, res) => {

    res.json({ message: 'oi express' });

})

/*mongoose
    .connect(`mongodb+srv://mongodb+srv://${DB_USER}:${DB_PASS}@api-challange.4ocpxz5.mongodb.net/?retryWrites=true&w=majority`)
    
    .then(() =>{
        console.log('Conectamos ao MongoDB')
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    })

*/
// para subir o servidor utilizar o comando => npm start. Assim subiremos o nodemon também para testes
app.listen(3001)