// What is express?
// Express is used to create a web server in Node. Express works on middleware concept (callback functions).

const express = require("express");
var cors = require("cors");
var app = express();

// cors is a middleware that allows us to make requests from different origins/domains
app.use(cors());

function custom_middleware(req, res, next) {
  console.log("Middleware function called");
  // We need to call the next function so the request doesnt hang
  next();
}

// Use the middleware function for all routes
app.use(custom_middleware);
// middleware for urlencoded data (form data)
app.use(
  express.urlencoded({
    extended: true, // allows to parse nested objects
  })
);

// What is an RESTful API?
// RESTful stand for Representational State Transfer.
// API stands for Application Programming Interface.
// A way to design your URL's to make it easy to interact with your server.

// API's use HTTP methods to interact with the server.
// GET method is used to get data from the server.
// POST method is used to send data to the server.
// PATCH method is used to update data on the server.
// PUT method is used to ovverite data objects on a server.
// DELETE method is used to delete data from the server.

// HTTP Status codes
// These are codes used to represent the status of the request/response.
// 200 - Successful
// 201 - Created: successful creation of a resource
// 404 - Not Found
// 400 - Bad Request: invalid or malformed request
// 500 - Internal Server Error

const users = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
  { id: 3, name: "Doe", age: 35 },
];

// Get method is used to get all users from a database
app.get(
  "/users",
  // this is a middleware function for the / route
  function (req, res) {
    // get all users from a database
    res.status(200).send(users);
  }
);

// Get method is used to get a specific user from a database
app.get("/users/:id", (req, res) => {
  // params is an object that contains the route parameters
  let id = parseInt(req.params.id); // convert the id to an integer
  // find the user with the id
  let user = users.find((user) => user.id === id);
  // if the user is not found
  if (!user) {
    // send a 404 status code
    res.send("User not found", 404);
  }
  // send the user back to the client
  res.status(200).send(user);
});

// Post method is used to create a new user
app.post("/users", function (req, res) {
  // get data from request body
  let user = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };

  //  add the user to the users array/database
  users.push(user);
  // send the user back to the client
  res.status(201).send(user);
});

// Patch method is used to update a user
app.patch("/users/:id", (req, res) => {
  // params is an object that contains the route parameters
  let id = parseInt(req.params.id); // convert the id to an integer
  // find the user with the id
  let user = users.find((user) => user.id === id);
  // if the user is not found
  if (!user) {
    // send a 404 status code
    res.send("User not found", 404);
  }
  // update the user
  user.name = req.body.name;
  user.age = req.body.age;

  // send the user back to the client
  res.status(200).send(user);
});

// Put method is used to overwrite a user
app.put("/users/:id", (req, res) => {
  // params is an object that contains the route parameters
  let id = parseInt(req.params.id); // convert the id to an integer
  // find the user with the id
  let user = users.find((user) => user.id === id);
  // if the user is not found
  if (!user) {
    // send a 404 status code
    res.send("User not found", 404);
  }

  // overwrite the user
  user.id = id;
  user.name = req.body.name;
  user.age = req.body.age;

  // send the user back to the client
  res.status(200).send(user);
});

// Delete method is used to delete a user
app.delete("/users/:id", (req, res) => {
  // params is an object that contains the route parameters
  let id = parseInt(req.params.id); // convert the id to an integer
  // find the user with the id
  let user = users.find((user) => user.id === id);
  // if the user is not found
  if (!user) {
    // send a 404 status code
    res.send("User not found", 404);
  }
  // find the index of the user for removal of entry
  let index = users.indexOf(user);
  // remove the user form the users array
  users.splice(index, 1);

  // send the user back to the client
  res.status(200).send(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
