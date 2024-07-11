import express from "express";
import { PORT } from "./config.js";

const app = express();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with the given ID was not found!");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

app.listen(PORT, () => console.log(`Listening on the port: ${PORT}`));
