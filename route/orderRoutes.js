import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/auth.middleware.js";
import { getAllOrdersController, getUserOrdersController } from "../controllers/orderController.js";

const router = express.Router();

// get all orders

router.get("/get-orders", requireSignIn , getAllOrdersController);

// user orders
 router.get("/all-orders", requireSignIn,isAdmin, getUserOrdersController);

export default router;