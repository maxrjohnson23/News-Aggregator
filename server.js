const express = require("express");
const mongoose = require("mongoose");
const scraper = require("./scripts/scraper");
const db = require("./models");

const app = express();

mongoose.connect("mongodb://localhost/news").then(() => {
    console.log('Connected to the database');
}).catch(err => {
    console.log(err);
});



app.get("/", function(req, res) {
    db.articles.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(data);
    })
});

app.get("/articles", (req, res) => {
    scraper.retrieveArticles().then((articles) => {
        res.json(articles);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.listen(3000, function() {
    console.log("App running on port 3000!");
});