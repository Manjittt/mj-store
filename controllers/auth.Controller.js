import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// POST Register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone, role, answer } = req.body;
    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "password is required",
      });
    }
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "phone is required",
      });
    }
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "address is required",
      });
    }
    if (!answer) {
      return res.status(400).json({
        success: false,
        message: "answer is required",
      });
    }

    // Checking existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Saving user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      role,
      answer,
    }).save();

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    console.error("Error in registration: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in registration",
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Create JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Forgot Password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Validation
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!answer) {
      return res.status(400).send({
        success: false,
        message: "Answer is required",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "New password is required",
      });
    }

    // Check if user exists with the provided email and answer
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or answer",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    return res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};

// Test Controller
export const testController = (req, res) => {
  return res.status(200).send("Protected Route");
};

// Update Profile Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update password only if provided
    let hashedPassword = user.password;
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    } else if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in updating profile",
      error,
    });
  }
};

//orders controller
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

// get all users controller
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ success: true, users });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Users",
      error,
    });
  }
}

