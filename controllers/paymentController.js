import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Generate token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        console.error("Braintree token error:", err);
        return res.status(500).json({
          success: false,
          message: err.message || "Failed to generate token",
        });
      }
      res
        .status(200)
        .json({ success: true, clientToken: response.clientToken });
    });
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// Online payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart, address } = req.body;

    if (!nonce)
      return res
        .status(400)
        .json({ success: false, message: "Payment nonce is required" });
    if (!cart || cart.length === 0)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    const totalPrice = cart
      .reduce((acc, item) => acc + Number(item.price || 0), 0)
      .toFixed(2);

    gateway.transaction.sale(
      {
        amount: totalPrice,
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },
      async (err, result) => {
        if (err || !result.success) {
          return res
            .status(500)
            .json({
              success: false,
              message: err ? err.message : result.message,
            });
        }

        try {
          const productIds = cart.map((item) => item._id); // extract product IDs

          const order = await new orderModel({
            products: productIds,
            payment: {
              method: "Braintree",
              transactionId: result.transaction.id,
              status: result.transaction.status,
            },
            buyer: req.user._id, // make sure user is logged in
            totalPrice: Number(totalPrice),
            address, // optional, can add to schema if needed
          }).save();

          res
            .status(200)
            .json({ success: true, message: "Payment successful", order });
        } catch (dbErr) {
          console.error("DB error:", dbErr);
          res
            .status(500)
            .json({
              success: false,
              message: dbErr.message || "Order saving failed",
            });
        }
      },
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// COD payment (unchanged)
export const codPaymentController = async (req, res) => {
  try {
    const { cart, address } = req.body;
    if (!cart || cart.length === 0)
      return res.status(400).json({ success: false, message: "Cart is empty" });
    if (!address)
      return res
        .status(400)
        .json({ success: false, message: "Delivery address is required" });

    const totalPrice = cart
      .reduce((acc, item) => acc + Number(item.price || 0), 0)
      .toFixed(2);

    const order = await new orderModel({
      products: cart,
      payment: { method: "COD", status: "Pending" },
      buyer: req.user._id,
      address,
      totalPrice,
    }).save();

    res
      .status(201)
      .json({
        success: true,
        message: "Order placed successfully (Cash on Delivery)",
        order,
      });
  } catch (error) {
    console.error("COD error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error placing COD order" });
  }
};
