const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the Notes
const NoteSchema = new Schema({
    text: {
        type: String,
        required: "Note text is required"
    },
    article: {type: Schema.Types.ObjectId, ref: 'Article'}
});

// Create a model from the schema
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
