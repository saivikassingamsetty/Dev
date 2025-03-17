import * as fs from "node:fs";
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
      requestedAt: req.requestedAt,
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

export {
  handleBase,
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
