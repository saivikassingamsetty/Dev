import { Movie } from "../models/movieModel.js";

const createMovie = async (req, res) => {
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

const getAllMovies = async (req, res) => {
  try {
    const excludeList = ["limit", "sort", "page", "fields"];
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(lt|lte|gte|gt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);

    excludeList.forEach((i) => delete queryObj[i]);

    let movieDocuments = Movie.find(queryObj);

    //Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.replace(",", " ");
      movieDocuments = movieDocuments.sort(sortBy);
    } else {
      movieDocuments = movieDocuments.sort("-createdAt");
    }

    //Limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      movieDocuments = movieDocuments.select(fields);
    }
    movieDocuments = movieDocuments.select("-__v");

    //Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = limit * (page - 1);
    movieDocuments = movieDocuments.skip(skip).limit(limit);

    if (req.query.page) {
      const movieCount = await Movie.countDocuments();
      if (skip >= movieCount) throw new Error("Page not found!");
    }

    const movies = await movieDocuments;

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

const getHighestRatedMovies = async (req, res) => {
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

const getMovie = async (req, res) => {
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

const updateMovie = async (req, res) => {
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

const deleteMovie = async (req, res) => {
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

export {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getHighestRatedMovies,
};
