`use strict`;
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const corsOptions = require(`./src/middleware/corsOptions.jsx`);
const app = express();

// Middleware
app
  .use(cors(corsOptions))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .get(`/`, (req, res) => res.status(200).json({ message: "Welcome to the API for testing programs" }));

// Routers

// Server
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
