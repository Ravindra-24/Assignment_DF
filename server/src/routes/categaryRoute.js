import { Router } from "express";
import { createCategaryData, deleteCategaryItem, getCategaryData, searchCategary, updateCategaryItem } from "../controller/CategaryController.js";
import { authMiddleware } from "../middleware/index.js";

const router = Router();
router.get("/search", authMiddleware, searchCategary);
router.get("/get", authMiddleware, getCategaryData);
router.post('/create',authMiddleware, createCategaryData)
router.delete('/delete/:categaryId',authMiddleware, deleteCategaryItem)
router.patch('/update',authMiddleware, updateCategaryItem)

export default router;
