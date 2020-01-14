// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
var filesDir = path.join(__dirname, "public")

// Load data
var data = JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json")))
console.log("Loaded data:")
console.log(data)

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

app.get("/", function (req, res) {
    res.sendFile(path.join(filesDir, "index.html"));
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(filesDir, "notes.html"));
})

app.get("/assets/*", function(req, res) {
  // Try to send file at path.
  var filePath = path.join(filesDir, req.path)
  res.sendFile(filePath);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
