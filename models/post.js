const db = require('./banco');
const Sequelize = db.Sequelize;

const Agendamentos = db.sequelize.define('agendamentos', {
    nome: {
        type: Sequelize.STRING,
    },
    telefone: {
        type: Sequelize.STRING,
    },
    origem: {
        type: Sequelize.STRING,
    },
    data_contato: {
        type: Sequelize.DATE,
    },
    observacoes: {
        type: Sequelize.TEXT
    }
})

// Agendamentos.sync({force: true})

module.exports = Agendamentos;