import { Router } from "express";
import { create, getAll, getPostagem } from "../controllers/postagensController.js";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getPostagem);

export default router;
