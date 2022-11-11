const router = require('express').Router();
const Pessoa = require('../models/Pessoa');

router.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

    const { nome, nascimento } = req.body;
    
    const pessoa = {
        nome,
        nascimento
    }
    if (!nome) {
        res.status(422).json({ error: 'O nome é obrigatório!' });
        return
    }
    try {
    
        await Pessoa.create(pessoa)
        console.log('cadastro realizado no banco')
    
        res.status(200).json({ message: 'Pessoa inserida com sucesso!' })     

    } catch (error) {

        res.status(500).json({ error: error });

    }
})

router.get('/', async (req, res) => {
    try{
        const pessoas = await Pessoa.find();
        res.status(200).json(pessoas);
    }catch(error) {
        res.status(500).json({ error: error })
    }
})


module.exports = router;