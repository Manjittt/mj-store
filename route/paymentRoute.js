import express from "express";
import { requireSignIn } from "../middlewares/auth.middleware.js";
import { braintreePaymentController, braintreeTokenController, codPaymentController } from "../controllers/paymentController.js";

const router = express.Router();



// payment gateway route
 router.get("/braintree/token", braintreeTokenController);

 //payment route
router.post("/braintree/payment",requireSignIn, braintreePaymentController);

// cod payment route
router.post("/cod/payment", requireSignIn, codPaymentController);

export default router;