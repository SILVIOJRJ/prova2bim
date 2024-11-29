// src/routes/seedRoutes.js
const express = require("express");
const { seedDatabase } = require("../controllers/seedController");
const router = express.Router();

// Rota para popular o banco de dados com dados iniciais
router.post("/seed", seedDatabase);

module.exports = router;
