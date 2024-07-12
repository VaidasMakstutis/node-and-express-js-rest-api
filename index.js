import express from "express";
import { PORT } from "./config.js";
import coursesRoute from "./routes/coursesRoute.js";

const app = express();

app.use(express.json());

app.use("/api/courses", coursesRoute);

app.listen(PORT, () => console.log(`Listening on the port: ${PORT}`));
