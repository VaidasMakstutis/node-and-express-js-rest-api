import express from "express";
import Joi from "joi";
import { PORT } from "./config.js";

const app = express();
app.use(express.json());

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
  if (!course) return res.status(404).send("The course with the given ID was not found!");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

app.post("/api/courses", (req, res) => {
  const { error } = inputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.status(200).send({ course, message: "Course has been posted successfully" });
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given ID was not found!");

  const { error } = inputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.status(200).send({ course, message: "Course has been updated successfully" });
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given ID was not found!");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.status(200).send({ course, message: "Course has been deleted successfully" });
});

function inputValidation(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

app.listen(PORT, () => console.log(`Listening on the port: ${PORT}`));
