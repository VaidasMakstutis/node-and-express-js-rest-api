import express from "express";
import Joi from "joi";

const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given ID was not found!");
  res.send(course);
});

router.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

router.post("/", (req, res) => {
  const { error } = inputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.status(200).send({ course, message: "Course has been posted successfully" });
});

router.put("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given ID was not found!");

  const { error } = inputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.status(200).send({ course, message: "Course has been updated successfully" });
});

router.delete("/:id", (req, res) => {
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

export default router;
