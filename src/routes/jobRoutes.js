// src/routes/jobRoutes.js
const express = require("express");
const { listUnpaidJobs } = require("../controllers/jobController");
const router = express.Router();

// Rota para listar jobs não pagos de um contrato
router.get("/contract/:contractId/unpaid", listUnpaidJobs);

module.exports = router;
