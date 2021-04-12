const express = require('express')
const Author = require('./models/Author.model')
const Category = require('./models/Category.model')
const Article = require('./models/Article.model')

// Création d'un nouvel objet "Router"
let adminRouter = express.Router();


adminRouter.get('/', (req, res) => {
    Article.find().populate('author category').exec().then(articles => {
        res.render('admin/admin', { articles })
    }).catch(error => res.send(error.message))
})

adminRouter.get('/write', (req, res) => {
    //  récupére la liste des auteurs et des categories 
    Promise.all([
        Author.find().sort('name'),
        Category.find().sort('title')
    ])
        .then(([authors, categories]) => res.render('admin/write', { authors, categories }))
        .catch(error => res.send(error.message))
})

adminRouter.post('/write', (req, res) => {
    Article.createArticle(req.body.titre, req.body.contenu, req.body.categorie, req.body.auteur).then(() => {
        res.redirect('/')
    }).catch(error => res.send(error.message))
})

adminRouter.get('/edit/:id', (req, res) => {
    // récupére la liste des auteurs et des categories 
    Article.findById(req.params.id)
        .populate('author category')
        .then(article => {
            if (!article) return Promise.reject(new Error('Article introuvable!'))
            return article
        })
        .then(article => {
            return Promise.all([
                Author.find().sort('name'),
                Category.find().sort('title'),
                article
            ])
        })
        .then(([authors, categories, article]) => res.render('admin/edit', { authors, categories, article }))
        .catch(error => res.send(error.message))
})

adminRouter.post('/edit/:id', (req, res) => {
    Article.updateArticle(req.params.id, req.body.titre, req.body.contenu, req.body.categorie, req.body.auteur).then(() => {
        res.redirect('/admin')
    }).catch(error => res.send(error.message))
})

adminRouter.get('/delete/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id).then(articleDeleted => {
        if (!articleDeleted) return Promise.reject(new Error('Article introuvable!'))
        res.redirect('/admin')
    }).catch(error => res.send(error.message))
})

// Exporte l'objet Router créé
module.exports = adminRouter