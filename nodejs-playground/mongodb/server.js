import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import app from "./app.js";

const client = new MongoClient(process.env.CONN_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("DB Connection Succesful");

    const db = client.db("cineflix");
    const collection = db.collection("movies");
    const results = await collection.find({}).toArray();
    console.log("Movies are ", results);
  } catch (e) {
    console.log("Connection Failed", e);
  } finally {
    await client.close();
    console.log("Connection Closed");
  }
};

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
