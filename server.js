const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});


mongoose.connect(process.env.MONGODB_URI || "mongodb://<dbuser>:<dbpassword>@ds061651.mlab.com:61651/heroku_g29hk984");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});