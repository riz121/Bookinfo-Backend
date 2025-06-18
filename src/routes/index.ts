import { Application } from "express";

import bookRoutes from "./book.routes";
import authorRoutes from "./author.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1/books", bookRoutes);
    app.use("/api/v1/authors", authorRoutes);
  }
}