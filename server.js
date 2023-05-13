import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();
import path from "path";

const PORT = process.env.PORT || 8000;

//db connect
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

// server static files

const __dirname = path.resolve();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public")));

// API routers
import adminRouter from "./src/router/adminRouter.js";
import categoryRouter from "./src/router/categoryRouter.js"
import paymentMethodRouter from "./src/router/paymentMethodsRouter.js"
import{isAuth} from "./src/middlewares/authMiddleware.js"
import productRouter from "./src/router/productRouter.js";
import ordersRouter from './src/router/orderRouter.js'



app.use("/api/v1/admin", adminRouter);
app.use ("/api/v1/category",isAuth, categoryRouter);
app.use("/api/v1/paymentMethods",isAuth, paymentMethodRouter);
app.use("/api/v1/product", isAuth, productRouter);
app.use("/api/v1/orders", ordersRouter)

// // API Router for reset password
// import ResetpassRouter from './src/router/ResetpassRouter.js'
// app.use("/api/v1/resetpass", ResetpassRouter)


//root url request
app.use("/", (req, res, next) => {
   
  const error = {
    message: "You dont have promission here",
  };
  res.json(error);
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.errorCode || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});