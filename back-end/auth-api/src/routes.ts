import { Router } from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

// Users
router.get("/users", authMiddleware, UserController.index);
router.post("/users", UserController.store);

// Auth
router.post("/auth", AuthController.auth);

export default router;
