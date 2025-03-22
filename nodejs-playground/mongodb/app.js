import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.status(200).send("Hello World");
});

export default app;
