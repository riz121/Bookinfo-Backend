import mongoose, { Schema } from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 100 },
    isbn: { type: String, required: true },
    qty: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true }
}, {
    timestamps: true // <-- This adds createdAt and updatedAt automatically
});

const BookModel = mongoose.model('Book', BookSchema);

export { BookModel };