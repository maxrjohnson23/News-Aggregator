const cheerio = require("cheerio");
const request = require("request");
const db = require("../models");


function retrieveArticles() {

    return new Promise((resolve, reject) => {
        request("https://arstechnica.com/gadgets/", (error, response, html) => {

            if (error) {
                reject(error);
            }
            // Load HTML for use with Cheerio
            const $ = cheerio.load(html);

            // List of articles to return
            let articles = [];

            // Iterate the articles and scrape data
            $("article.article").each(function (i, element) {

                // Retrieve article information from the html
                let title = $(element).find("header h2").text();
                let link = $(element).find("a.overlay").attr("href");
                let excerpt = $(element).find("header p.excerpt").text();

                // Create new article to be saved
                if (title && link && excerpt) {
                    articles.push({
                        title,
                        link,
                        excerpt,
                        saved: false
                    });
                }
            });

            // Bulk insert articles to the database
            db.Article.insertMany(articles)
                .then(function (dbArticle) {
                    resolve(dbArticle);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    });
}

module.exports = {
    retrieveArticles: retrieveArticles
};
