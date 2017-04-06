var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use("/public", express.static("public"));

app.set('views', __dirname + '/');
app.set('view engine', 'hbs');

console.log(process.env.NODE_ENV);

app.get("/", function (req, res) {
  res.render("index", {NODE_ENV: process.env.NODE_ENV});
});

app.use(function (err, req, res, next) {
  var code = err.code || 500;
  res.status(code).json({result: false, detail: err.message});
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});