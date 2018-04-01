const express = require('express');
const router = express.Router();
const scraper = require("../scripts/scraper");

// Scrape all articles to database
router.get("/scrape", (req, res) => {
    scraper.retrieveArticles()
        .then(articles => res.json(articles))
        .catch(err => res.status(500).send(err));
});

module.exports = router;