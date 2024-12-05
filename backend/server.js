import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import certRoute from "./routes/certRoute.js";
import userRoute from "./routes/userRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB()
  .then(() => {
    try {
      const app = express();

      app.use(cors({
        origin: process.env.ALLOWED_ORIGIN,
        credentials: true
      }));
      app.use(bodyParser.json({ limit: "50mb" }));
      app.use(cookieParser());

      app.use(express.json({ limit: "50mb" }));
      app.use(express.urlencoded({ limit: "50mb", extended: true }));

      app.use("/api/certificates", certRoute);
      app.use("/api/upload", uploadRoute);
      app.use("/api/user", userRoute);

      app.use(notFound);
      app.use(errorHandler);

      const PORT = process.env.PORT || 5000;

      app.listen(
        PORT,
        console.log(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
      );
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => {
    console.error("Error : ", error.message);
  });
