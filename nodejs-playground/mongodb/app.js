import express from "express";
import morgan from "morgan";
import { moviesRouter } from "./moviesRoutes.js";

const MOVIES_ENDPOINT = "/api/v1/movies";

const app = express();

const logger = (req, res, next) => {
  console.log("Custom Middleware called");
  next();
};

//Middleware
app.use(express.json());
app.use(logger);
app.use((req, res, next) => {
  req.requestedAt = new Date();
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static("./public"));

//Routes
app.use(MOVIES_ENDPOINT, moviesRouter);

export default app;
