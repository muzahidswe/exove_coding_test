// Write a program that counts the number of nodes in a non-directional graph and finds out whether there is a cycle in the graph

const express = require("express");
const multer = require("multer");
const cv = require("opencv4nodejs");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/detect-circles", upload.single("image"), (req, res) => {
  const image = cv.imdecode(req.file.buffer);
  const gray = image.cvtColor(cv.COLOR_BGR2GRAY);
  const circles = gray.houghCircles(cv.HOUGH_GRADIENT, 1, 20, 100, 30, 20, 10);

  res.json({
    numCircles: circles.length
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});