var axios = require('axios');
//posteriormente encontrar uma maneira de colocar como number o campo código, de maneira auto
//import { randomUUID } from 'node:crypto';
const router = require('express').Router();

// ---   UTILIZAR ESSA ROTA PARA FAZER A PERMANENCIA NO MEU BANCO   --- //

//mock da permanencia dos dados que serão enviados para o post e teste no POSTMAN
const pessoas = [];
var token;



const handleGetToken = async () =>{

    try {
        /*const username = 'Bryan';
        const password = '46259249870';
        
        let data = {
            username: username,
            password: password
        }*/
        const response = await axios.get('http://168.138.231.9:10666/get-token', {
            auth: {
                username: 'Bryan',
                password: '46259249870'
            }
        });
        
        console.log(response.data)
        
    } catch (error) {
        console.log(error.message);
    }


}


//  CREATE - criação de pessoa
router.post('/', async (req, res) => {
   const { codigo, nome, data_nascimento } = req.body;

   if (!nome) {
    res.status(422).json({ error: 'O nome é obrigatório!' });
    return
    }

    const pessoa = {
        codigo,
        nome,
        data_nascimento,
    }

    // adição de dados do body para o mock de dados --
    // depois olhar aonde persistirei os dados

    pessoas.push(pessoa);

    res.status(201).json(pessoa)
    
    console.log(pessoas);
});
//  READ - ver pessoas

router.get('/', (req, res, next) => {
    //erro aqyu na passagem do cabeçalho
    /*axios
    .get('http://168.138.231.9:10666/get-token',{username: username, password: password})
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => console.log(err)) ;*/
    const token = handleGetToken();
    console.log(token)
    res.status(200).json('bateu na APIexterna');

});


module.exports = router;