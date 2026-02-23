import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Products",
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
        itemImage: String,
      },
    ],

    payment: {
      method: String,
      status: String,
      transactionId: String,
    },

    buyer: {
      type: mongoose.ObjectId,
      ref: "Users",
    },

    address: {
      fullName: String,
      phone: String,
      email: String,
      area: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
    },

    totalAmount: {
      type: Number,
    },

    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
