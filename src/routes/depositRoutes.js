// src/routes/depositRoutes.js
const express = require("express");
const { depositToProfile } = require("../controllers/depositController");
const router = express.Router();

// Rota para realizar depósito em um perfil
router.post("/:profileId", depositToProfile);

module.exports = router;
