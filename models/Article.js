const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the Articles
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: String,
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    // An article can have many notes
    // The ref property links the ObjectId to the Note model
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Create a model from the schema
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
