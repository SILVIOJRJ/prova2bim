// src/services/contractService.js
const Contract = require("../models/contractModel");

async function getContractsByProfile(profileId) {
  try {
    const contracts = await Contract.findAll({
      where: { clientId: profileId },
    });
    return contracts;
  } catch (error) {
    throw new Error("Erro ao listar contratos");
  }
}

module.exports = {
  getContractsByProfile,
};
