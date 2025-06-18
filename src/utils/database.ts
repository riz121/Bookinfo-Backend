import mongoose from "mongoose";
import logger from "../middleware/logger.middleware";

export default class Database {
    public static async connect() {
        const connectionUrl = process.env.database_url;
        if (!connectionUrl) {
            logger.error("The url to connect to the database is not defined!");
            throw new Error("Database URL not defined");
        }

        try {
            await mongoose.connect(connectionUrl);
            logger.info("Successfully connected to MongoDB.");
        } catch (error) {
            logger.error(`Connection to MongoDB failed: ${error}`);
            throw error;
        }
    }
}

mongoose.set("strictQuery", false);


