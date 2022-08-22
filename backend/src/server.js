const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const userController = require("./controllers/user.controller");
const NoticeController = require("./controllers/notice.controller");
const path = require("path");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// const { register, login } = require("./controllers/auth.controller");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGODB_URL,
  {
    maxIdleTimeMS: 80000,
    serverSelectionTimeoutMS: 80000,
    socketTimeoutMS: 0,
    connectTimeoutMS: 0,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

app.use("/api/users", userController);
app.use("/notices", NoticeController);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "build", "index.html"))
//   );
// }
var __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 5000);
// app.set("port", PORT);
