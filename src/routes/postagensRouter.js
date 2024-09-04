import { Router } from "express";
import { create, deletePostagem, getAll, getPostagem, updatePostagem } from "../controllers/postagensController.js";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getPostagem);
router.put("/:id", updatePostagem);
router.delete("/:id", deletePostagem);

export default router;
