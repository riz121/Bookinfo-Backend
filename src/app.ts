import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from 'compression';

import Database from "./utils/database";
import Routes from "./routes";
import errorMiddleware from "./middleware/error.middleware";
import logger from "./middleware/logger.middleware";
import morganMiddleware from "./middleware/morgan.middleware";



//const allowedOrigins = ['/http:\/\/localhost(:\d{1,5})?/'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || /^http:\/\/localhost(:\d{1,5})?$/.test(origin)) {
      callback(null, true); // allow
    } else {
      callback(new Error('Not allowed by CORS')); // reject
    }
  },
  credentials: true,
};
export default class App {
  private app: Application;
  private port: Number;

  constructor(app: Application, port: Number) {
    this.app = app;
    this.port = port;

    this.initialize();
  }

  private async initialize() {
    await this.initializeDatabaseConnection();

    this.initializeMiddleware();
    this.initializeRoutes();
    // Must be initialized after the routes. Therefore it can't be inlcuded in the other method.
    this.initializeErrorMiddleware();
    this.startServer();
  }


  private async initializeDatabaseConnection(): Promise<void> {
    await Database.connect();
  }

  private initializeRoutes() {
    new Routes(this.app);
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // this.app.use(cors({
    //   origin: corsOptions
    // }));
    this.app.use(cors(corsOptions));

    this.app.use(helmet());
    this.app.use(morganMiddleware);
    this.app.use(compression());
  }

  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

  private startServer() {
    this.app.listen(this.port, () => {
      logger.info(`Server running at http://localhost:${this.port}`);
    });
  }
}