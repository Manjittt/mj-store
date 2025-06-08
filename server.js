import express from "express";
import colors from "colors";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './Route/authRoutes.js'
import categoryRoutes from './Route/categoryRoutes.js'
import productRoutes from './Route/productRoutes.js'
import cors from 'cors'



//dotenv configure
dotenv.config();

//Connect to database
connectDB()


// express object
const app = express();

//Middleweres
app.use(cors());
//For taking input in JSON formate.
app.use(express.json());
//Logs http requests in a readable format
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use("/api/v1/product", productRoutes);


//testing rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to  Ecommerce app</h1>");
});

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server runing on ${process.env.DEV_MODE} mode on port  ${PORT}`.bgCyan.white);
});
