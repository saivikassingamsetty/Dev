import express from "express";

const app = express();

app.get("/", (req, res) => {
  // sends text/html
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(200).send("Hello World");

  //sends json
  res.status(200).json({ name: "Vikas" });
});

app.post("/", () => {});

app.listen(3000, () => {
  console.log("Server has started");
});
