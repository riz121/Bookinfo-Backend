import { Document, Types } from 'mongoose';

export default interface Author extends Document {
    name: string;
}