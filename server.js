const express = require("express");
const mongojs = require("mongojs");

const app = express();

const databaseUrl = "news";
const collections = ["articles"];

const db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
});

app.get("/", function(req, res) {
    res.send("Hello world");
});

app.listen(3000, function() {
    console.log("App running on port 3000!");
});