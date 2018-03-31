const cheerio = require("cheerio");
const request = require("request");

function retrieveArticles() {

    return new Promise((resolve, reject) => {
        request("https://arstechnica.com/gadgets/", (error, response, html) => {

            if (error) {
                reject(err);
            }
            const $ = cheerio.load(html);

            // An empty array to save the data that we'll scrape
            let articles = [];

            $("article.article").each(function (i, element) {

                // Save the text of the element in a "title" variable
                let title = $(element).find("header h2").text();
                let articleLink = $(element).find("a.overlay").attr("href");
                let excerpt = $(element).find("header p.excerpt").text();

                console.log(title);
                console.log(excerpt);
                console.log(articleLink);

                if (title && excerpt && articleLink) {
                    articles.push({
                        title,
                        excerpt,
                        articleLink
                    });
                }
            });
            resolve(articles);
        });
    });
}

module.exports = retrieveArticles;
