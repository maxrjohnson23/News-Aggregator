const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const scraper = require("./scripts/scraper");
const db = require("./models");
const app = express();

// Set up body parse and public resources
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://localhost/news").then(() => {
    console.log('Connected to the database');
}).catch(err => {
    console.log(err);
});


app.get("/", function (req, res) {
    db.articles.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(data);
    })
});

// Retrieve all articles
app.get("/articles", (req, res) => {
    db.Article.find().then((articles) => {
        res.json(articles);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Retrieve all articles
app.get("/scrape", (req, res) => {
    scraper.retrieveArticles().then((articles) => {
        res.json(articles);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Get specific article by id with populated notes
app.get("/articles/:id", (req, res) => {
    db.Article.findById(req.params.id).populate("notes").then((data) => {
        if (data) {
            res.json(data);
        } else {
            res.status(404).send({error: "No article found for this id"});
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Update specific article by id.  Used primarily for setting saved value on the Article
app.patch("/articles/:id", (req, res) => {
    db.Article.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((data) => {
        if (data) {
            res.json(data);
        } else {
            res.status(404).send({error: "No article found for this id"});
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Create a note tied to a specific article
app.post("/articles/:id/notes/", (req, res) => {

    db.Note.create(req.body)
        .then((note) => {
            // If the note was created, add it to the selected Article
            return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {notes: note._id}}, {new: true});
        })
        .then(function (article) {
            res.json(article);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.listen(3000, function () {
    console.log("App listening on port 3000");
});