import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
});

const AuthorModel = mongoose.model("Author", AuthorSchema);

export { AuthorModel };