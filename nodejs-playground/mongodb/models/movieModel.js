import mongoose from "mongoose";

const movieScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required!"],
  },
  rating: {
    type: Number,
  },
  totalRatings: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Released Year is required!"],
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  genres: {
    type: [String],
    required: [true, "Genres is required!"],
  },
  directors: {
    type: [String],
    required: [true, "Directors is required!"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover Image is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
});

const Movie = mongoose.model("Movie", movieScheme);

export { Movie };
