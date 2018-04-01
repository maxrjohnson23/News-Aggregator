const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const scraper = require("./scripts/scraper");
const logger = require("morgan");
const db = require("./models");

// Routers
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const scrapeRouter = require('./routes/scrape');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Configure static directory
app.use(express.static("public"));

// Configure logging middleware
app.use(logger('dev'));

// Configure handlebars templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setting up routes
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/scrape', scrapeRouter);


// Configure and connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news";

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));

// Start express server
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
});