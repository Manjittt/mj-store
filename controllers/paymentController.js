import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();

// =============================
// BRAINTREE GATEWAY CONFIG
// =============================
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// =============================
// GENERATE BRAINTREE TOKEN
// =============================
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        console.error("Braintree Token Error:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to generate token",
        });
      }

      return res.status(200).json({
        success: true,
        clientToken: response.clientToken,
      });
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =============================
// ONLINE PAYMENT (BRAINTREE)
// =============================
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart, address } = req.body;

    if (!nonce) {
      return res.status(400).json({
        success: false,
        message: "Payment nonce is required",
      });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Calculate total amount
    const totalAmount = cart.reduce(
      (acc, item) => acc + Number(item.price || 0),
      0,
    );

    // Process payment
    const result = await gateway.transaction.sale({
      amount: totalAmount.toFixed(2),
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message,
      });
    }

    // Save Order in DB
    const order = await new orderModel({
      products: cart.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      payment: {
        method: "Braintree",
        status: result.transaction.status,
        transactionId: result.transaction.id,
      },
      buyer: req.user._id,
      address: address, // ✅ Correct field
      totalAmount: totalAmount, // ✅ Correct field
      status: "Processing",
    }).save();

    return res.status(200).json({
      success: true,
      message: "Payment successful",
      order,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// =============================
// CASH ON DELIVERY (COD)
// =============================
export const codPaymentController = async (req, res) => {
  try {
    const { cart, address } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const totalAmount = cart.reduce(
      (acc, item) => acc + Number(item.price || 0),
      0,
    );

    const order = await new orderModel({
      products: cart.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      payment: {
        method: "COD",
        status: "Pending",
        transactionId: null,
      },
      buyer: req.user._id,
      address: address, // ✅ Fixed
      totalAmount: totalAmount, // ✅ Added
      status: "Not Process",
    }).save();

    return res.status(200).json({
      success: true,
      message: "Order placed successfully (COD)",
      order,
    });
  } catch (error) {
    console.error("COD Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error placing COD order",
    });
  }
};
