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
var dbPath = path.join(__dirname, "db/db.json")

// Read + write JSON db
const data = JSON.parse(fs.readFileSync(dbPath))
console.log("Loaded data:")
console.log(data)

function writeDB() {
  fs.writeFileSync(dbPath, JSON.stringify(data))
}

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

// Implement GET /api/notes: return list of notes
app.get("/api/notes", function(req, res) {
  // Return the notes as JSON, adding the array index
  // as the property 'id' for each note. 
  res.json(data.map(function(item, index) {
    return { ...item, id: index }
  }))
})

// Implement POST /api/notes: save a note
app.post("/api/notes", function(req, res) {
  data.push(req.body)
  writeDB()
  // Tell browser it succeeded
  res.status(200)
  res.end()
})

// Implement DELETE /api/notes/<ID>: delete a note

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
