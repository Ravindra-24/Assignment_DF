import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";
import { createProductItem, deleteProductItem, getProducts, searchProductData, updateProductItem } from "../controller/productController.js";
import upload from "../utils/uploader.js"

const router = Router();

router.get('/search', authMiddleware, searchProductData)

router.get('/get', authMiddleware, getProducts)
router.post('/create', upload.single("productImg"), authMiddleware, createProductItem)
router.patch('/update',upload.single("productImg"), authMiddleware, updateProductItem)
router.delete('/delete/:productId', authMiddleware, deleteProductItem)


export default router;
