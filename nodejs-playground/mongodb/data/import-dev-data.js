import mongoose from "mongoose";
import * as fs from "fs";
import dotenv from "dotenv";
import { Movie } from "../models/movieModel.js";

dotenv.config({ path: "./config.env" });

//Connect to MongoDB
try {
  const connection = await mongoose.connect(process.env.CONN_STRING);
  console.log("DB Connection Successful");
} catch (e) {
  console.log("DB Connection Failed", e);
}

// Read movies.json file (run from root through cmd)
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

//Delete existing movie documents from collection
const deleteMovies = async () => {
  try {
    await Movie.deleteMany();
    console.log("Deleted Successfully!");
  } catch (e) {
  } finally {
    process.exit();
  }
};

//Add the movies to database collection
const importMovies = async () => {
  try {
    await Movie.create(movies);
    console.log("Imported Successfully!");
  } catch (e) {
  } finally {
    process.exit();
  }
};

if (process.argv[2] === "--import") {
  void importMovies();
}

if (process.argv[2] === "--delete") {
  void deleteMovies();
}
