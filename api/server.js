import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const corsOptions = {
  origin: "*",
  Credential: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("conneted"))
  .catch((err) => console.log(err));

app.get("/", (req, res) =>
  res.status(200).send({ success: "server is running " })
);

app.listen(3001, () => console.log("server is running on PORT 3001"));
