import orderModel from "../models/orderModel.js";
import braintree from "braintree";

// ==============================
// BRAINTREE CONFIGURATION
// ==============================
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// ==============================
// CREATE ORDER (COD + BRAINTREE)
// ==============================
export const createOrderController = async (req, res) => {
  try {
    const { cart, nonce, paymentMethod, address } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // ======================
    // CALCULATE TOTAL
    // ======================
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    // ======================
    // CASH ON DELIVERY
    // ======================
    if (paymentMethod === "COD") {
      const order = await new orderModel({
        products: cart,
        payment: {
          method: "COD",
          status: "Cash on Delivery",
        },
        buyer: req.user._id,
        address: address || req.user.address, // ✅ FIXED
        totalAmount: total,
        status: "Processing",
      }).save();

      return res.status(200).json({
        success: true,
        message: "COD Order Placed Successfully",
        order,
      });
    }

    // ======================
    // BRAINTREE PAYMENT
    // ======================
    if (paymentMethod === "Braintree") {
      const result = await gateway.transaction.sale({
        amount: total.toFixed(2),
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      });

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Payment Failed",
        });
      }

      const order = await new orderModel({
        products: cart,
        payment: {
          method: "Braintree",
          status: "Paid",
          transactionId: result.transaction.id,
        },
        buyer: req.user._id,
        address: address || req.user.address, // ✅ FIXED
        totalAmount: total,
        status: "Processing",
      }).save();

      return res.status(200).json({
        success: true,
        message: "Payment Successful & Order Placed",
        order,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid payment method",
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while creating order",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE ORDER STATUS (ADMIN)
// ==============================
export const updateOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating order status",
      error: error.message,
    });
  }
};

// ==============================
// CANCEL ORDER (USER)
// ==============================
export const cancelOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "Shipped" || order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled after shipping",
      });
    }

    order.status = "Cancel";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while cancelling order",
      error: error.message,
    });
  }
};

// ==============================
// GET USER ORDERS
// ==============================
export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("buyer", "name email")
      
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Get User Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while getting user orders",
      error: error.message,
    });
  }
};

// ==============================
// GET ALL ORDERS (ADMIN)
// ==============================
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while getting all orders",
      error: error.message,
    });
  }
};
