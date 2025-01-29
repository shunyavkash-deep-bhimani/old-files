import nunjucks from "nunjucks";
import express from "express";

var app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const PORT = "8000";

app.get("/", function (req, res) {
  res.render("home.njk");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
