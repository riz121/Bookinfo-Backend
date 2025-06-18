import { Document, Types } from 'mongoose';

export default interface Book extends Document {
    title: string;
    isbn: string;
    qty:number;
    author: Types.ObjectId;
}