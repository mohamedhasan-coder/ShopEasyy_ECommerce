import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config({path:"backend/config/config.env"});
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(3000, () => {
    console.log(`Server Is Running on http://localhost:${PORT}`);
});