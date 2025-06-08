import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import {
    categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//route

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//UPDATE CATEGORY
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all category
router.get("/get-category" , categoryController)

// single category
router.get("/single-category/:slug",singleCategoryController)

// Delete Category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)
export default router;
