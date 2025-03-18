import * as fs from "node:fs";
const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

const checkId = (req, res, next, val) => {
  let movie = movies.find(({ id }) => id == val);

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: `Movie with ID ${val} is not found`,
    });
  }

  next();
};

const handleBase = (req, res) => {
  // sends text/html
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(200).send("Hello World");

  //sends json
  res.status(200).json({ name: "Vikas" });
};

const getAllMovies = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: { movies },
  });
};

const validateCreateMovieRequest = (req, res, next) => {
  if (
    !Object.keys(req.body).length ||
    !req.body?.name ||
    !req.body?.releasedYear
  ) {
    return res.status(400).json({
      status: "fail",
      message: "A movie object is needed",
    });
  }
  next();
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
  res.status(200).json(movie);
};

const updateMovie = (req, res) => {
  const { params, body } = req;
  const movieId = movies.findIndex(({ id }) => id == params.id);
  console.log(movieId, params.id);
  movies[movieId] = { id: movies[movieId].id, ...body };
  fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
    res.status(200).json({
      status: "success",
      movies: movies,
    });
  });
};

const deleteMovie = (req, res) => {
  const id = +req.params.id;
  const deleteId = movies.findIndex((mv) => mv.id === id);
  movies.splice(deleteId, 1);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
    res.status(200).json({
      status: "success",
      movies: movies,
    });
  });
};

export {
  handleBase,
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  checkId,
  validateCreateMovieRequest,
};
