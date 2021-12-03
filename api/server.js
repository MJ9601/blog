const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");

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
app.use(express.json());

// localserver for test

let db = mongoose.connect("mongodb://localhost/blog");

// mongoose
//   .connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(console.log("conneted"))
//   .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.listen(3001, () => console.log("server is running on PORT 3001"));
