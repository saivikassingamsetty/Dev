import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import app from "./app.js";

// const connectDB = async () => {
//   const client = new MongoClient(process.env.CONN_STRING, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//   });

//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("DB Connection Succesful");

//     const db = client.db("cineflix");
//     const collection = db.collection("movies");
//     const results = await collection.find({}).toArray();
//     console.log("Movies are ", results);
//   } catch (e) {
//     console.log("Connection Failed", e);
//   } finally {
//     await client.close();
//     console.log("Connection Closed");
//   }
// };

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONN_STRING);
    console.log("DB Connection Successful");
  } catch (e) {
    console.log("DB Connection Failed", e);
  }
};

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
