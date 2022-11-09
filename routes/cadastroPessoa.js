
//posteriormente encontrar uma maneira de colocar como number o campo código, de maneira auto
//import { randomUUID } from 'node:crypto';
const router = require('express').Router();

//mock da permanencia dos dados que serão enviados para o post e teste no POSTMAN
const pessoas = [];

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
router.get('/', async (req, res) => {
   
    // adição de dados do body para o mock de dados --
    // depois olhar aonde persistirei os dados

    res.status(201).json(pessoas)

});

module.exports = router;