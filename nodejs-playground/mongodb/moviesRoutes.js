import express from "express";
import {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getHighestRatedMovies,
} from "./controllers/moviesController.js";

const moviesRouter = express.Router();

moviesRouter.route("/").get(getAllMovies).post(createMovie);

moviesRouter.route("/highest-rated").get(getHighestRatedMovies)

moviesRouter.param("id", (req, res, next, val) => {
  console.log("Movie id is", val);
  next();
});

moviesRouter.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export { moviesRouter };
