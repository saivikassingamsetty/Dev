import express from "express";
import * as fs from "node:fs";

const app = express();

//middleware to have a body property on req object
app.use(express.json());

const MOVIES_ENDPOINT = "/api/v1/movies";

const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

const handleBase = (req, res) => {
  // sends text/html
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(200).send("Hello World");

  //sends json
  res.status(200).json({ name: "Vikas" });
};

const getAllMovies = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  try {
    // const rs = fs.createReadStream("./data/movies.json");
    // rs.pipe(res);

    res.status(200).json({
      status: "success",
      count: movies.length,
      data: { movies },
    });
  } catch (error) {
    res.send(404).send("Movies data not found");
  }
};

const createMovie = (req, res) => {
  const nextId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: nextId }, req.body);
  movies.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
};

//update by id
// app.put(MOVIES_ENDPOINT + "/:id", (req, res) => {
//   const { params, body } = req;
//   const movieId = movies.findIndex(({ id }) => id == params.id);
//   console.log(movieId, params.id);
//   if (movieId != -1) {
//     movies[movieId] = { id: movies[movieId].id, ...body };
//     fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
//       res.status(200).json({
//         status: "success",
//         movies: movies,
//       });
//     });
//   } else {
//     res.status(404).send("No Movie Found");
//   }
// });

const getMovie = (req, res) => {
  const { params } = req;
  const movie = movies.find(({ id }) => id == params.id);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send("No Movie Found");
  }
};

const updateMovie = (req, res) => {
  const { params, body } = req;
  const movieId = movies.findIndex(({ id }) => id == params.id);
  console.log(movieId, params.id);
  if (movieId != -1) {
    movies[movieId] = { id: movies[movieId].id, ...body };
    fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
      res.status(200).json({
        status: "success",
        movies: movies,
      });
    });
  } else {
    res.status(404).send("No Movie Found");
  }
};

const deleteMovie = (req, res) => {
  const id = +req.params.id;
  const deleteId = movies.findIndex((mv) => mv.id === id);

  if (deleteId != -1) {
    movies.splice(deleteId, 1);
    fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
      res.status(200).json({
        status: "success",
        movies: movies,
      });
    });
  } else {
    res.status(404).send("No Movie Found");
  }
};

// app.get("/", handleBase);
// app.get("/api/v1/movies", getAllMovies);
// app.get(MOVIES_ENDPOINT + "/:id", getMovie);
// app.post("/api/v1/movies", createMovie);
// app.patch(MOVIES_ENDPOINT + "/:id", updateMovie);
// app.delete(MOVIES_ENDPOINT + "/:id", deleteMovie);

//we can also do this!!
app.route(MOVIES_ENDPOINT).get(getAllMovies).post(createMovie);

app
  .route(MOVIES_ENDPOINT + "/:id")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deleteMovie);

app.listen(3000, () => {
  console.log("Server has started");
});
