require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect(
  `mongodb+srv://LoganSorensen:${process.env.MONGO_ATLAS_PW}@cluster0.xzx84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.status(200).json({});
//   }
//   next();
// });

// Routers
const itemRoutes = require("./api/routes/items");
const categoryRoutes = require("./api/routes/categories");
const listRoutes = require("./api/routes/lists");

// Routes
app.use("/items", itemRoutes);
app.use("/categories", categoryRoutes);
app.use("/lists", listRoutes);

module.exports = app;
