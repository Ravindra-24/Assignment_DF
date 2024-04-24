import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./src/utils/db.utils.js";
import authRoutes from "./src/routes/authRoute.js";
import categaryRoute from "./src/routes/categaryRoute.js"
import productRoute from './src/routes/productRoute.js'
const app = express();

const PORT = process.env.PORT || 8080;

connectDB();
app.use(
  cors({
    origin: "https://assignment-df.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use('/auth', authRoutes)
app.use('/categary', categaryRoute)
app.use('/product', productRoute)

app.get("/", (req, res) => {
  res.send(`Server is running  `);
});

app.listen(PORT, () => {
  console.log(`Server version 1.1`);
});
