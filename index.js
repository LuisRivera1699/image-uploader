const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { put } = require("@vercel/blob");

const app = express();
app.use(cors());
const PORT = 3000;

// Configura el almacenamiento con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Endpoint para recibir y almacenar la imagen
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/upload", async (req, res) => {
    console.log(req.params);
    const b = await put(req.params.filename, req, {
        access: 'public',
    });
    res.json({ location: `${b}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
