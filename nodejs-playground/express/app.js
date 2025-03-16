import express from "express";
import * as fs from "node:fs";

const app = express();

const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

app.get("/", (req, res) => {
  // sends text/html
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(200).send("Hello World");

  //sends json
  res.status(200).json({ name: "Vikas" });
});

// app.post("/", () => {});

//creating a web api GET /api/v1/movies
app.get("/api/v1/movies", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  try {
    // const rs = fs.createReadStream("./data/movies.json");
    // rs.pipe(res);

    res.status(200).json({
      status: "success",
      data: { movies },
    });
  } catch (error) {
    res.send(404).send("Movies data not found");
  }
});

app.listen(3000, () => {
  console.log("Server has started");
});
