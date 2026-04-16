require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/dB");
const userRouter = require("./routes/userRoute");
const sellerRouter = require("./routes/sellerRoute");
const connectCloudinary = require("./configs/cloudinary");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const addressRouter = require("./routes/addressRoute");
const orderRouter = require("./routes/OrderRoute");

const app = express();
const port = process.env.PORT || 4000;

//Allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

//Middleware configure
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("Api is Working"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const startServer = async () => {
  try {
    // Now await is perfectly valid because it's inside an async function
    await connectDB();
    await connectCloudinary();
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

startServer();
