import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

// Get orders for a single user
export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate({
        path: "products",
        select: "name price", // only get name and price
      })
      .populate({
        path: "buyer",
        select: "name email", // only get name and email
      })
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

// Get all orders (admin)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate({
        path: "products",
        select: "name price", // only get name and price
      })
      .populate({
        path: "buyer",
        select: "name email", // only get name and email
      })
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
