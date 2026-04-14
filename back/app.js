import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

export const PORT = process.env.PORT || 5000;
export const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Maršrutai
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes); 
app.use("/api/v1/categories", categoryRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({ status: "server ok" });
});

export default app;