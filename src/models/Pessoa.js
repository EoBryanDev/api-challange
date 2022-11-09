const mongoose = require('mongoose');

const Pessoa = mongoose.model('Pessoa', {
    codigo: Number,
    nome: String,
    nascimento: Date,

});

module.exports = Pessoa;