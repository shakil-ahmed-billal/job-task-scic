const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// mongoDB database connection setup
connectDB();

// routes
app.use("/api", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
