import express from "express";
import dotenv from "dotenv";
import path from "path";
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

      app.use(
        cors({
          origin: "http://localhost:3000/",
          credentials: true,
        })
      );
      app.use(bodyParser.json({ limit: "50mb" }));
      app.use(cookieParser());

      app.use(express.json({ limit: "50mb" }));
      app.use(express.urlencoded({ limit: "50mb", extended: true }));

      app.use("/api/certificates", certRoute);
      app.use("/api/upload", uploadRoute);
      app.use("/api/user", userRoute);

      const __dirname = path.resolve();
      app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

      if (process.env.NODE_ENV === "production") {
        app.use(express.static("frontend/build"));

        app.get("*", (req, res) => {
          res.sendFile(
            path.resolve(__dirname, "frontend", "build", "index.html")
          );
        });
      }

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
