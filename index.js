import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Course: ${id}`);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

app.listen(PORT, () => console.log(`Listening on the port: ${PORT}`));
