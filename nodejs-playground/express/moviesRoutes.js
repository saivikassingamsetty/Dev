import express from "express";
import {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} from "./controllers/moviesController.js";

const moviesRouter = express.Router();
moviesRouter.route("/").get(getAllMovies).post(createMovie);

moviesRouter.param("id", (req, res, next, val) => {
  console.log("Movie id is", val);
  next();
});

moviesRouter.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export { moviesRouter };
