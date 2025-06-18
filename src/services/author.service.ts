import { Types } from "mongoose";
import HttpError from "../utils/httpError.error";
import { AuthorModel } from "../models/author.model";
import Author from "../interfaces/author.interface";
import logger from "../middleware/logger.middleware";
import { BookModel } from "../models/book.model";

export default class AuthorService {
    private authorModel = AuthorModel;
    private bookModel = BookModel;

    public async create(name: string): Promise<Author> {
        try {
            const author = await this.authorModel.create({
                name: name
            });

            return author;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be created!`);
        }
    }

    public async findAll(): Promise<Author[]> {
        try {
            const authors = await this.authorModel.find();

            return authors;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be read!`);
        }
    }

    public async findById(id: Types.ObjectId): Promise<Author | null> {
        try {
            const author = await this.authorModel.findById(id);

            return author;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be read!`);
        }
    }

    public async findByName(name: string): Promise<Author | null> {
        try {
            const author = await this.authorModel.findOne({ name: name });

            return author;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be read!`);
        }
    }

    public async update(id: Types.ObjectId, name: string): Promise<Author | null> {
        try {
            const author = await this.authorModel.findByIdAndUpdate(
                id,
                {
                    name: name
                },
                {
                    returnDocument: 'after'
                });

            return author;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be updated!`);
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            const author = await this.findById(id);
            if (!author) {
                return;
            }

            const booksOfAuthor = await this.bookModel.find({ author: author.id })
                .populate('author');
            if (booksOfAuthor && booksOfAuthor.length > 0) {
                logger.error(`There are still ${booksOfAuthor?.length} books assigned. Therefore the author can't be deleted.`);
                throw new HttpError(400, `Please delete all books of the author first!`);
            }

            await this.authorModel.deleteOne(id);
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }

            logger.error(error);
            throw new HttpError(500, `Author couldn't be deleted!`);
        }
    }
}