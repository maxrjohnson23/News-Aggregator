const express = require('express');
const router = express.Router();
const scraper = require("../scripts/scraper");

// Scrape all articles to database
router.get("/", (req, res) => {
    scraper.retrieveArticles()
        .then(articleCount => res.json(articleCount))
        .catch(err => res.status(500).send(err));
});

module.exports = router;