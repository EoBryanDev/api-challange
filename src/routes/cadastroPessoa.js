var axios = require('axios');
//posteriormente encontrar uma maneira de colocar como number o campo código, de maneira auto
//import { randomUUID } from 'node:crypto';
const router = require('express').Router();

// ---   UTILIZAR ESSA ROTA PARA FAZER A PERMANENCIA NO MEU BANCO   --- //

// 2.1 - Inicializei a variavel token para ser armazenada com o retorno da validação da APIexterna
let token = '';

// 3.1 - Inicializar a variavel que exibirá os dados de consulta retornados da APIexterna
let pessoas = [];

let pessoa = {};

// 4.1 - Inicializar a variavel que mostrará a mensagem de resposta do cadastro
let respostaCadastro = '';

// 1.0 - Método que faz a requisição na APIexterna para recuperar o token de autenticação
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

// 3.0 - Trazer a lista de pessoas que estão retornadas da APIexterna
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

showPerson = async (codigo) => {
    try {
        let response = await axios.get(`http://168.138.231.9:10666/cadastro/${codigo}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        console.log('aqui')
        console.log(response.data)
        let data = response.data;
        console.log(data)
        pessoa = data

    } catch (error) {
        console.log('lá')
        console.log(error.message);
    }
}

// 4.0 - Fazer registro de pessoa com base nos requisitos de estrutura da APIexterna
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


//  CREATE - criação de pessoa na APIexterna
router.get('/cadastro', async (req, res) => {
    //const { nome, data_nascimento} = req.body;
    //handleGetToken()


    //console.log(token)
    

    /*let pessoa = {
        nome: 'teste_D2',
        data_criacao: new Date,
        data_nascimento: '29-01-1998',
    }*/

    /*const pessoa = {
        nome: 'teste_D2',
        email: '2dTeste@gmail.com',
        data_criacao: '09-11-2022',
        data_nascimento: '29-01-1998',

    }
    if (!pessoa.nome) {
        res.status(422).json({ error: 'O nome é obrigatório!' });
        return
    }

    try {
        const i = await axios.post('http://168.138.231.9:10666/cadastro', pessoa , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(i.data)
        respostaCadastro = i.data
        res.status(201).json(respostaCadastro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    */
    cadastrarAPIExterna()
    res.status(201).json(respostaCadastro);


    //res.status(201).json(respostaCadastro)

});

//  READ - inicio de autenticação para rota externa e recuperação de dados da APIexterna
router.get('/', (req, res) => {

    handleGetToken();


    //chamar já o método de buscar

    res.status(200).json(`${token}`);

});

// READ - verificar os registros da APIexterna
router.get('/listarRegistros', (req, res) => {

    showPeople();
    res.status(200).json(pessoas);
})

router.get('/listarRegistro/:codigo', (req, res) => {
    showPerson(req.params);
    res.status(200).json(pessoa);
})


module.exports = router;