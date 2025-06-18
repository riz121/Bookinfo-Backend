import { BookModel } from "../models/book.model";
import Book from "../interfaces/book.interface";
import { Types } from "mongoose";
import HttpError from "../utils/httpError.error";
import logger from "../middleware/logger.middleware";
import Author from "../interfaces/author.interface";
import { AuthorModel } from "../models/author.model";

export default class BookService {
    private bookModel = BookModel;
    private authorModel = AuthorModel;

    public async create(title: string, isbn: string, qty:number, author: Author): Promise<Book> {
        try {
            const book = await this.bookModel.create({
                title: title,
                isbn: isbn,
                qty:qty,
                author: author
            });

            return book;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be created!`);
        }
    }

    public async findAll(): Promise<Book[]> {
        try {
            const books = await this.bookModel.find()
                .populate("author");

            return books;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Books couldn't be read!`);
        }
    }

    public async findById(id: Types.ObjectId): Promise<Book | null> {
        try {
            const book = await this.bookModel.findById(id)
                .populate("author");

            return book;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be read!`);
        }
    }

    public async findByAuthor(name: string): Promise<Book[] | null> {
        try {
            const author = await this.authorModel.findOne({ name: name });
            if (!author) {
                return null;
            }
            return await this.bookModel.find({ author: author._id });
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be read!`);
        }
    }

    public async update(
        id: Types.ObjectId,
        title?: string,
        isbn?: string,
        qty?: number,
        author?: Author
    ): Promise<Book | null> {
        try {
            const propertiesToUpdate = await this.parseProperties(
                title,
                isbn,
                qty,
                author
            );
            if (Object.keys(propertiesToUpdate).length === 0) {
                logger.warn(`No properties supplied to update. Therefore no update is triggered!`);
                return await this.findById(id);
            }

            const book = await this.bookModel.findByIdAndUpdate(
                id,
                {
                    title: title,
                    isbn: isbn,
                    qty
                },
                {
                    returnDocument: 'after'
                })
                .populate("author");

            return book;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be updated!`);
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            await this.bookModel.deleteOne(id);
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be deleted!`);
        }
    }

    private async parseProperties(
        title?: string,
        isbn?: string,
        qty?: number,
        author?: Author
    ): Promise<Object> {
        const propertiesToUpdate: { [key: string]: any } = {}

        if (title) {
            propertiesToUpdate[`title`] = title;
        }

        if (isbn) {
            propertiesToUpdate[`isbn`] = isbn;
        }
        if (qty) {
            propertiesToUpdate[`qty`] = qty;
        }
        if (author) {
            propertiesToUpdate[`author`] = author;
        }

        return propertiesToUpdate;
    }
}