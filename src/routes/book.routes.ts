import { Router } from "express";
import BookController from "../controllers/book.controller";
import validationMiddleware from "../middleware/validation.middleware";
import bookValidation from "../validations/book.validation";

class BookRoutes {
  router = Router();
  controller = new BookController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", validationMiddleware(bookValidation.create), this.controller.create);

    this.router.get("/", this.controller.query);
    this.router.get("/:id", this.controller.findById);
    this.router.get("/:id/author", this.controller.findByIdAndReturnAuthor);

    this.router.put("/:id", validationMiddleware(bookValidation.update), this.controller.update);
    
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new BookRoutes().router;