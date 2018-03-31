const express = require("express");
const mongojs = require("mongojs");
const scraper = require("./scripts/scraper");



const app = express();

const databaseUrl = "news";
const collections = ["articles"];

const db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
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
    scraper().then((articles) => {
        res.json(articles);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.listen(3000, function() {
    console.log("App running on port 3000!");
});