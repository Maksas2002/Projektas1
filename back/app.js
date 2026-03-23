import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.use("/api/v1/users", usersRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({ status: "server ok" });
});

export default app;