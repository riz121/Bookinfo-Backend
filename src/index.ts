import { configDotenv } from "dotenv";
configDotenv();

import express, { Application } from "express";
import App from "./app";

const app: Application = express();
const port: Number = Number.parseInt(process.env.PORT || "") | 3001;

new App(app, port);