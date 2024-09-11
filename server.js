const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(cors());
// Path to the uploaded CSV file (you'll use the actual path in your project)
const csvFilePath = path.join(__dirname, "crime.csv");

// Endpoint to return the CSV as JSON
app.get("/data", (req, res) => {
  let results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results);
    })
    .on("error", (err) => {
      res.status(500).json({ error: "Error reading CSV file" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
