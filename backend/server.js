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
      const corsOptions = {
        origin: function (origin, callback) {
          const localhostRegex = /^http:\/\/localhost:\d+$/;
          const allowedOrigins = process.env.ALLOWED_ORIGIN?.split(",")
          // Allow requests with no origin (like mobile apps, curl, postman)
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
            return callback(null, true);
          } else {
            return callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
      }

      app.set('trust proxy', true);
      app.use(cors(corsOptions));

      app.options("*", cors(corsOptions));
      app.use(cookieParser());
      app.use(bodyParser.json({ limit: "50mb" }));

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
