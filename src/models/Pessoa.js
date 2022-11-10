const mongoose = require('mongoose');

const Pessoa = mongoose.model('Pessoa', {
    nome: String,
    nascimento: Date,

});

module.exports = Pessoa;