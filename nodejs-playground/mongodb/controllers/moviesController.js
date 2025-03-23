import { Movie } from "../models/movieModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";

const apiFeatures = new ApiFeatures();

export const createMovie = asyncErrorHandler(async (req, res, next) => {
  const movie = await Movie.create(req.body);

  if (!movie) {
    const err = new CustomError("Movie Not Found", 404);
    return next(err);
  }

  res.status(201).json({
    status: "success",
    data: { movie },
  });
});

export const getAllMovies = asyncErrorHandler(async (req, res, next) => {
  const features = new ApiFeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const movies = await features.query;

  res.status(200).json({
    status: "success",
    length: movies.length,
    data: { movies },
  });
});

export const getHighestRatedMovies = asyncErrorHandler(
  async (req, res, next) => {
    let movies = await Movie.find().sort("-rating price").limit(5);
    res.status(200).json({
      status: "success",
      length: movies.length,
      data: { movies },
    });
  }
);

export const getMovie = asyncErrorHandler(async (req, res, next) => {
  // const movie = await Movie.find({ _id: req.params.id });
  const movie = await Movie.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: { movie },
  });
});

export const updateMovie = asyncErrorHandler(async (req, res, next) => {
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: { updatedMovie },
  });
});

export const deleteMovie = asyncErrorHandler(async (req, res, next) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getMovieStats = async (req, res, next) => {
  try {
    const stats = await Movie.aggregate([
      { $match: { price: { $gte: 50 } } },
      {
        $group: {
          _id: "$releaseYear",
          avgReleaseYear: { $avg: "$releaseYear" },
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
          avgPrice: { $avg: "$price" },
          totalPrice: { $sum: "$price" },
          movieCount: { $sum: 1 },
        },
      },
      { $sort: { minPrice: 1 } },
    ]);

    res.status(200).json({
      status: "success",
      count: stats.length,
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getMovieByGenre = async (req, res, next) => {
  const genreMap = {
    action: "Action",
  };

  try {
    const { genre } = req.params;
    const movies = await Movie.aggregate([
      { $unwind: "$genres" },
      {
        $match: {
          genres: genreMap[genre],
        },
      },
    ]);

    const movieByGenre = await Movie.aggregate([
      { $unwind: "$genres" },
      {
        $group: {
          _id: "$genres",
          movieCount: { $sum: 1 },
          movies: { $push: "$name" },
        },
      },
      { $addFields: { genre: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { movieCount: -1 } },
      {
        $match: {
          genre: genreMap[genre] ?? genre,
        },
      },
      // { $limit: 3 },
    ]);

    res.status(200).json({
      status: "success",
      count: movies.length,
      data: {
        movieByGenre,
        movies,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
