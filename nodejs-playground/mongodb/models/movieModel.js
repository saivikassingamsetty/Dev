import mongoose from "mongoose";
import * as fs from "fs";
import validator from "validator";

const movieScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      maxLengtth: [100, "Movie Name should be less than 100 characters"],
      minLength: [4, "Movi Name should be greater than 4 character"],
      unique: true,
      trim: true,
      validator: [validator.isAlpha, "Name should only has alphabetical"],
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
      validate: {
        validator: (rating) => {
          return rating >= 1 && rating <= 10;
        },
        message:
          "Rating should be greater than equals to 1 and less than equals to 10",
      },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual properties
movieScheme.virtual("durationByHours").get(function () {
  return this.duration / 60;
});

//middleware for save/create method
movieScheme.pre("save", function (next) {
  console.log(this);
  this.createdBy = "Vikas";
  console.log("Before reading document");
  next();
});

//middleware for read/find method
movieScheme.pre("find", function (next) {
  console.log(this);
  this.find({ releaseDate: { $lte: Date() } });
  console.log("Before reading document");
  this.startTime = Date.now();
  next();
});

movieScheme.post("find", function (doc, next) {
  console.log(this);
  this.createdBy = "Vikas";
  console.log("After reading document", doc);
  let content = `Document has been Read at ${Date()} by ${this.createdBy} \n`;
  content += `Query took ${Date.now() - this.startTime}ms`;
  fs.writeFileSync("./logs/log.txt", content, { flag: "a" }, (e) => {
    console.log(e);
  });

  next();
});

//Middlewares for aggregation
movieScheme.pre("aggregate", function (next) {
  console.log("before aggregation");
  this.pipeline().unshift({ $match: { releaseDate: { $lte: new Date() } } });
  next();
});

movieScheme.post("aggregate", function (doc, next) {
  console.log("after aggregation");
  next();
});

const Movie = mongoose.model("Movie", movieScheme);

export { Movie };
