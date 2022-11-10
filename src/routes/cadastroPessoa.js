var axios = require('axios');
//posteriormente encontrar uma maneira de colocar como number o campo código, de maneira auto
//import { randomUUID } from 'node:crypto';
const router = require('express').Router();

// ---   UTILIZAR ESSA ROTA PARA FAZER A PERMANENCIA NO MEU BANCO   --- //

//mock da permanencia dos dados que serão enviados para o post e teste no POSTMAN
const pessoas = [];

// 2.1 - inicializei a variavel token para ser armazenada com a resposta de validação
let token = '';

let debug = [];

// 1.0 - metodo que faz a requisição na APIexterna para recuperar o token de autenticação
handleGetToken = async () => {

    try {
  
        let response = await axios.get('http://168.138.231.9:10666/get-token', {
            auth: {
                // utilizar o dotenv para esconder esses dados sensiveis
                username: 'Bryan',
                password: '46259249870'
            }
        });
        
        let data = response.data.token;
        // 2.2 - Atribuição do retorno da autenticação, ou seja, o token.
        token = data;
        
    } catch (error) {
        console.log(error.message);
    }


}

// 3.0 - Mostrar os dados que estão retornados na API
showPeople = async () => {
    try {
        let response = await axios.get('http://168.138.231.9:10666/cadastro/1', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        let data = response.data;
        console.log(data)
        debug = data

    } catch (error) {
        console.log(error.message);
    }
}


cadastrarAPIExterna = async ()=> {
    /*try {
        let response = await axios.post('http://168.138.231.9:10666/cadastro', {requisicaoDeveFalhar: true });

        let data = response.data
        console.log(data)
        debug = data;

    } catch (error) {
        console.log(error.message)
    }*/
}



//  CREATE - criação de pessoa na APIexterna
router.post('/cadastro', async (req, res) => {
   //const { codigo, nome, data_nascimento } = req.body;
    /*
    if (!nome) {
        res.status(422).json({ error: 'O nome é obrigatório!' });
        return
        }*/

    /*const pessoa = {
        codigo: 1850,
        nome: 'teste_D2',
        data_criacao: new Date,
        data_nascimento: '29-01-1998',
    }*/
    //cadastrarAPIExterna()

    res.status(201).json({mensagem: 'aqui'})

});

//  READ - inicio de autenticação para rota externa e recuperação de dados da APIexterna
router.get('/', (req, res) => {

    handleGetToken();
    

    //chamar já o método de buscar

    res.status(200).json(`${token}, ${debug}`);

});

router.get('/teste', (req, res) => {

    showPeople();
    res.status(200).json(debug);
})


module.exports = router;