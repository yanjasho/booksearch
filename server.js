const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true });

app.get("/api/books", (req, res) => {
  db.Book.find({})
  .then(dbModel => res.json(dbModel))
  .catch(function(err) {
    res.json(err);
  });
})

app.post("/books/:id", function(req, res) {
  db.Book.create(req.body)
  .then(function(dbBook) {
    res.json(dbBook);
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.delete("/api/books/:id", function(req, res) {
  db.Book.deleteOne({ _id: req.params.id })
  .then(function(dbBooks) {
    res.json(dbBooks);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});