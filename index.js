import express from "express";

const app = express();
const PORT = 8000;

import path from "path";
import fs from "fs";

const __dirname = path.resolve();
console.log(__dirname);
const fn = __dirname + "/userList.csv";

// middleware
app.use(express.urlencoded());

// root registration
app.get("/registration", (req, res) => {
  console.log(req.query);

  //   res.send("<h1> You are in the registration </h1>");
  res.sendFile(__dirname + "/src/regForm.html");
});
app.post("/registration", (req, res) => {
  const { email, password } = req.body;

  const str = `${email}, ${password}\n`;
  fs.appendFile(fn, str, (error) => {
    error ? console.log(error.message) : console.log("added to file");
  });
  console.log(req.body);

  // res.send("<h1> You are in the register u may login now  </h1>");
  res.sendFile(__dirname + "/src/regForm.html");
});

// root login
app.get("/login", (req, res) => {
  console.log("received request to Login router ");

  res.sendFile(__dirname + "/src/login.html");
});
// root login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const str = `${email}, ${password}`;

  // read file
  fs.readFile(fn, (error, data) => {
    error && console.log(error.message);

    const userStr = data.toString();
    const userArg = userStr.split("\n");

    if (userArg.includes(str)) {
      res.send("<h1 stylye='color:green'> Login succesfully </h1>");
    } else {
      res.send("<h1 style='color:red'> Invalid login <h1>");
    }
  });

  // res.send(`<h1> You are in the Login </h1>`);
});

// root router or homepage
app.get("/", (req, res) => {
  console.log("received request to home router ");

  res.send(`
  <h1> You are in the homepage </h1>
  <a href="/registration"> <button> Register </button>
  
  
  `);
});

// make out server available on http request

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server is running at http://localhost:${PORT} `);
});
