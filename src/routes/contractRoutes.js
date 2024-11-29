// contractRoutes.js
const express = require("express");
const { listContractsByProfile } = require("../controllers/contractController");
const router = express.Router();

// Esta é a rota correta para obter contratos de um perfil específico
router.get("/profiles/:profileId/contracts", listContractsByProfile);

module.exports = router;
