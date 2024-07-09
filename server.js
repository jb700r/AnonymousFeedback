const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize SQLite Database
// Connect to (or create) the database file
let db = new sqlite3.Database("complaints.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the complaints.db database.");
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS complaints (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)"
  );
});

// Endpoint to submit complaints/comments
app.post("/submit", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send("Message is required");
  }

  const stmt = db.prepare("INSERT INTO complaints (message) VALUES (?)");
  stmt.run(message, function (err) {
    if (err) {
      return res.status(500).send("Failed to submit complaint");
    }
    res.status(200).send({ id: this.lastID });
  });
  stmt.finalize();
});

// Get the complaints
app.get("/complaints", (req, res) => {
  db.all("SELECT * FROM complaints", [], (err, rows) => {
    if (err) {
      return res.status(500).send("Failed to retrieve complaints");
    }
    res.status(200).json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
