// What is express?
// Express is used to create a web server in Node. Express works on middleware concept (callback functions).

const express = require("express");
const app = express();

function custom_middleware(req, res, next) {
  console.log("Middleware function called");
  // We need to call the next function so the request doesnt hang
  next();
}

// Use the middleware function for all routes
app.use(custom_middleware);

app.get(
  "/",
  // this is a middleware function for the / route
  function (req, res) {
    res.send("Hello World");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
