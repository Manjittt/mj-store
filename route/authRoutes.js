import express from "express";
import {registerController,loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllUsersController} from "../controllers/auth.Controller.js";
import { requireSignIn, isAdmin } from "../middlewares/auth.middleware.js";


// router object

const  router = express.Router();

//register || post
router.post('/register', registerController);

//login||POST
router.post('/login',loginController)

// forget password
router.post('/forgot-password',forgotPasswordController)

// test route 
router.get("/test", requireSignIn, isAdmin, testController);

//Protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});


//Protected admin route
router.get("/admin-auth", requireSignIn, isAdmin ,(req, res) => {
  res.status(200).json({ ok: true });
});

// update user profile
router.put("/profile", requireSignIn, updateProfileController); 

//orders
router.get("/orders", requireSignIn, getOrdersController);

// all users
router.get("/all-users", getAllUsersController);


export default router;