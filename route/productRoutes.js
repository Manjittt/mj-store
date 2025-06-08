import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController
} from "../controllers/productController.js"
import Formidable from "express-formidable";

const router = express.Router();

// Define route for creating a product, using necessary middlewares and Formidable for file handling
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  Formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  Formidable(),
  updateProductController
);

//get All product
router.get("/get-product", getProductController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get photo

router.get("/product-photo/:pid", productPhotoController);

// delete product

router.delete("/delete/:pid", deleteProductController);

// fiter product
router.post("/product-filters", productFilterController);

router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// Search Product 
router.get("/search/:keyword",searchProductController)

// similaer product
router.get("/related-product/:pid/:cid", realtedProductController);

// category wise product
router.get("/product-category/:slug", productCategoryController)

// payment gateway route
 router.get("/braintree/token", braintreeTokenController);

 //payment route
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
