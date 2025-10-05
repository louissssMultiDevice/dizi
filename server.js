import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Baca komentar
app.get("/comments", (req, res) => {
  fs.readFile("comments.json", (err, data) => {
    if (err) return res.status(500).send("Error membaca database.");
    const comments = JSON.parse(data || "[]");
    res.json(comments);
  });
});

// Tambah komentar baru
app.post("/comments", (req, res) => {
  const newComment = req.body;
  fs.readFile("comments.json", (err, data) => {
    const comments = JSON.parse(data || "[]");
    comments.push(newComment);
    fs.writeFile("comments.json", JSON.stringify(comments, null, 2), (err) => {
      if (err) return res.status(500).send("Gagal menyimpan komentar.");
      res.status(201).json(newComment);
    });
  });
});

app.listen(PORT, () => console.log(`🚀 DIZI Music berjalan di http://localhost:${PORT}`));
