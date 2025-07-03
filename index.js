const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const Movie = require("./models/Movie")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error", err))

app.get("/", (req, res) => {
  res.send("🎬 Movie API is working!")
})

// ➕ Add Movie
app.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body)
    await movie.save()
    res.status(201).send({ message: "Movie Added", movie })
  } catch (err) {
    res.status(400).send({ error: "Failed to add movie" })
  }
})

// 📥 Get All Movies
app.get("/movies", async (req, res) => {
  const movies = await Movie.find()
  res.send(movies)
})

// ✏️ Update Movie
app.put("/movies/:id", async (req, res) => {
  const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send({ message: "Movie Updated", updated })
})

// ❌ Delete Movie
app.delete("/movies/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id)
  res.send({ message: "Movie Deleted" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
