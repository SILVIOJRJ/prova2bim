// src/controllers/contractController.js
const { getContractsByProfile } = require("../services/contractService");

async function listContractsByProfile(req, res) {
  try {
    const { profileId } = req.params;
    const contracts = await getContractsByProfile(profileId);

    if (!contracts.length) {
      return res.status(404).json({ message: "Nenhum contrato encontrado para este perfil." });
    }

    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar contratos.", error });
  }
}

module.exports = { listContractsByProfile };
