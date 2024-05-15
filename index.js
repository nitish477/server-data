import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import userRouter from "./src/routes/userRoutes.js";
import cors from "cors"
const app = express();
app.use(express.json());

app.use(cors())
const connetDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
      console.log("Database Connected Successfully".green.underline);
    }
  } catch (error) {
    console.log(error.message.red.bold);
  }
};

const __dirname = path.resolve();

app.get("/healths", async (req, res) => {
  res.status(200).send("Api Work");
});

app.use("/api/user", userRouter);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.green.bold);
  connetDB();
});
