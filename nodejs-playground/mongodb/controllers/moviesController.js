import { Movie } from "../models/movieModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

const apiFeatures = new ApiFeatures();

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: { movie },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

export const getAllMovies = async (req, res) => {
  try {
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
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

export const getHighestRatedMovies = async (req, res) => {
  try {
    let movies = await Movie.find().sort("-rating price").limit(5);
    res.status(200).json({
      status: "success",
      length: movies.length,
      data: { movies },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

export const getMovie = async (req, res) => {
  try {
    // const movie = await Movie.find({ _id: req.params.id });
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { movie },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: { updatedMovie },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

export const getMovieStats = async (req, res) => {
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

export const getMovieByGenre = async (req, res) => {
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
