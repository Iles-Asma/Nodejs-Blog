const express = require('express')
const Article = require('./models/Article.model')

// Création d'un nouvel objet "Router"
let blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
    Article.find().populate('author category').exec().then(articles => {
        res.render('index', { articles })
    }).catch(error => res.send(error.message))
})

blogRouter.get('/article/:id', (req, res) => {
    Article.findById(req.params.id).populate('author category').exec().then(articles => {
        if (!articles) return Promise.reject(new Error('Article inexistant.'))

        res.render('article', { articles })
    })
        .catch(error => res.send(error.message))
})

// Exporte l'objet Router créé
module.exports = blogRouter