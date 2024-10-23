// What is express?
// Express is used to create a web server in Node. Express works on middleware concept (callback functions).

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
