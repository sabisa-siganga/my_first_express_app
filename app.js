const express = require("express");
// initializing express
const app = express();
// port for server to listen on
const PORT = 3000;

// using middleware to parse JSON data
app.use(express.json());

// displaying/serving the static files (about and contact files)
app.use(express.static("public"));

// creating a route handler to read the person's name from person.json file
app.get("/", (req, res) => {
  const fs = require("fs");

  // Reading the person.json file
  fs.readFile("person.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    try {
      const person = JSON.parse(data);
      const name = person.name;
      res.send(`Welcome, ${name}!`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is listening on port${PORT}`);
});

// Displaying an error message when a user enters an unknown path
app.get("*", function (req, res, next) {
  let error = new Error(
    `Sorry! Can't find that resource. Please check your URL`
  );
  error.statusCode = 404;
  next(error);
});
