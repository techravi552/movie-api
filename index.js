const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// ✅ Movie model
const Movie = require("./models/Movie");

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:3000", // React app allowed
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB Connect
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🎬 Movie API is running");
});

// ✅ Create Movie
app.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "✅ Movie added", movie });
  } catch (err) {
    res.status(400).json({ error: "❌ Failed to add movie" });
  }
});

// ✅ Get All Movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to fetch movies" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
