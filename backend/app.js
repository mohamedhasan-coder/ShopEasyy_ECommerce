import express from "express";
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js"
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", product);
app.use("/api/v1/", user);
app.use(errorHandler);

export default app;