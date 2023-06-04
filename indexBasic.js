import { EventEmitter } from "events";
import express from "express";

const app = express();

const eventEmitter = new EventEmitter();

eventEmitter.on("hi", () => {
  console.log("hello");
  eventEmitter.emit("hola");
});

eventEmitter.on("hola", () => {
  console.log("commingg home");
});

eventEmitter.emit("hi");

app.get("/", (req, res) => {
  res.send("<h1> heloo i am chat not <h1/>");
});
app.get("/", (req, res) => {
  res.send("<h1> Contact page <h1/>");
});

app.listen(8000, (error) => {
  error
    ? console.log(error.message)
    : console.log("your server is running at http://localhost:8000");
});
