const router = require('express').Router();

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

    pessoas.push(pessoa);
    res.status(201).json(pessoa)
    console.log(pessoas);
});

module.exports = router;