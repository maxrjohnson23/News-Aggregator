const express = require("express");
const router = express.Router();
const db = require("../models");

// Populate all articles and render page
router.get("/", (req, res) => {
    db.Article
        .find({})
        .then(articles => res.render("index", {articles}))
        .catch(err => res.json(err));
});

// Render saved articles page
router.get("/savedArticles", (req, res) => {
    db.Article
        .find({saved: true})
        .then(result => {
            console.log(`Found ${result}`);
            res.render("savedArticles", {articles: result})
        })
        .catch(err => res.json(err));
});

module.exports = router;