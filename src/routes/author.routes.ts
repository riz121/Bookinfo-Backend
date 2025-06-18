import { Router } from "express";
import AuthorController from "../controllers/author.controller";
import validationMiddleware from "../middleware/validation.middleware";
import authorValidation from "../validations/author.validation";

class AuthorRoutes {
  router = Router();
  controller = new AuthorController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", validationMiddleware(authorValidation.author), this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findById);
    this.router.put("/:id", validationMiddleware(authorValidation.author), this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new AuthorRoutes().router;