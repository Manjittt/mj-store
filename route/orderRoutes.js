import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/auth.middleware.js";
import { cancelOrderController, getAllOrdersController, getUserOrdersController, updateOrderStatusController } from "../controllers/orderController.js";

const router = express.Router();

// get all orders

router.get("/get-orders", requireSignIn , getUserOrdersController);

// user orders
 router.get("/all-orders", requireSignIn,isAdmin, getAllOrdersController);

 router.put("/cancel-order/:orderId", requireSignIn, cancelOrderController);

 // update order status
 router.put(
   "/order-status/:orderId",
   requireSignIn,
   isAdmin,
   updateOrderStatusController,
 );

export default router;