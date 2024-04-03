const express = require('express')
const app = express()
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const post = require('./models/post')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('index')
})

app.get('/consultar', function(req, res){
    post.findAll().then((result) => {
        res.render('consultar', { agendamentos: result });
    }).catch((err) => {
        console.log('Erro ao consultar agendamentos:', err);
        res.status(500).send('Erro ao consultar agendamentos');
    });
});


app.post('/cadastrar', function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacoes: req.body.observacoes
    }).then((result) => {
        console.log('Agendamento cadastrado com sucesso')
    }).catch((err) => {
        console.log('Erro ao cadastrar agendamento')
    });

    res.redirect('/')
})

app.get('/atualizar/:id', function(req, res){
    const id = req.params.id;
    post.findByPk(id).then((result) => {
        const agendamento = result.dataValues;
        res.render('atualizar', { agendamento: agendamento });
    }).catch((err) => {
        console.log('Erro ao consultar agendamentos:', err);
        res.status(500).send('Erro ao consultar agendamentos');
    });
});

app.post('/editar/:id', function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacoes: req.body.observacoes
    }, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        console.log('Agendamento atualizado com sucesso')
    }).catch((err) => {
        console.log('Erro ao atualizar agendamento')
    });

    res.redirect('/consultar')
})

app.get('/deletar/:id', function(req, res){
    post.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        console.log('Agendamento deletado com sucesso')
    }).catch((err) => {
        console.log('Erro ao deletar agendamento')
    });

    res.redirect('/consultar')
})

app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000')
})