var axios = require('axios');
const router = require('express').Router();
const Pessoa = require('../models/Pessoa');


// 0.1 - Inicializei a variavel token para ser armazenada com o retorno da validação da APIexterna
let token = '';

// 1.1 - Inicializar a variavel que exibirá os dados de consulta retornados da APIexterna
let pessoas = [];

// 3.1 - Inicializar a variavel que exibirá o dado de consulta retornados da APIexterna
let pessoa = {};

// 2.1 - Inicializar a variavel que mostrará a mensagem de resposta do cadastro
let respostaCadastro = '';

// 0.1.1 - Método que faz a requisição na APIexterna para recuperar o token de autenticação
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
        console.log(data);
        // 2.2 - Atribuição do retorno da autenticação, ou seja, o token.
        token = data;

    } catch (error) {
        console.log(error.message);
    }


}

// 1.1.1 - Trazer a lista de pessoas que estão retornadas da APIexterna
showPeople = async () => {
    try {
        let response = await axios.get('http://168.138.231.9:10666/cadastro/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        let data = response.data;
        console.log(data)
        pessoas = data

    } catch (error) {
        console.log(error.message);
    }
}

// 3.1.1 - Trazer apenas uma pessoa com base no código identificador 
showPerson = async (codigo) => {
    try {
        let response = await axios.get(`http://168.138.231.9:10666/cadastro/${codigo}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        console.log(response.data)
        let data = response.data;
        console.log(data)
        pessoa = data

    } catch (error) {
        console.log('lá')
        console.log(error.message);
    }
}

// 2.1.1 - Fazer registro de pessoa com base nos requisitos de estrutura da APIexterna
cadastrarAPIExterna = async () => {

    const pessoa = {
        nome: 'teste_D2',
        email: 'd2Teste@teste.com',
        data_nascimento: '1958-09-04',
        data_criacao: '2021-12-01 08:54:21',

    }

    try {
        let response = await axios.post('http://168.138.231.9:10666/cadastro', pessoa, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log(response)
        let data = response.data.mensagem
        console.log(data)
        respostaCadastro = data


    } catch (error) {
        console.log(error.message)
    }
}

cadastrarDB = async (codigo) => {
    try {
        let response = await axios.get(`http://168.138.231.9:10666/cadastro/${codigo}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        let data = response.data;
        let pessoaFiltrada = data.map((pessoa) => (
            {
                nome: pessoa.nome, 
                nascimento: pessoa.data_nascimento
            }
        ))
        await Pessoa.create(pessoaFiltrada)
        console.log('cadastro realizado no banco')

        

    } catch (error) {
        console.log(error.message);
    }
}
// 0.0 - READ - inicio de autenticação para rota externa e recuperação de dados da APIexterna
router.get('/', (req, res) => {

    handleGetToken();

    res.redirect('/pessoa/listarRegistros')
    //res.status(200).json(`${token}`);

});

// 1.0 - READ - verificar os registros da APIexterna
router.get('/listarRegistros', (req, res) => {
    console.log('aqui' + req.headers.authorization)

    showPeople();

    res.status(200).json(pessoas);

});

// 2.0 CREATE - criação de pessoa na APIexterna
router.get('/cadastro', async (req, res) => {
    
    cadastrarAPIExterna()

    res.status(201).json(respostaCadastro);

});

// 3.0 READ - verificar apenas 1 registro da APIexterna
router.get('/listarRegistro/:codigo', (req, res) => {

    const { codigo } = req.params;

    showPerson(codigo);

    res.status(200).json(pessoa);
});

// 4.0 CREATE - criar rota que pesquisa um id da APIexterna e realiza a criação de um novo array filtrado para ser inserido no banco de dados pessoal
router.get('/cadastroPessoal/:codigo', (req, res) => {

    const { codigo } = req.params;

    cadastrarDB(codigo);
    
    console.log(pessoa);

    res.status(201).json(pessoa);

})

router.get('/cadastroDBteste/:codigo', (req, res) => {
    const { codigo } = req.params;
    handleGetToken()
    cadastrarDB(codigo);

    console.log(pessoa);

    res.status(201).json(pessoa);
})

router.get('/seila', (req,res) => {

    
    const { name } = req.body;
    

    const person = {
        name
    }
    //res.status(201).json(person);*/

})

module.exports = router;