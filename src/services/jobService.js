// src/services/jobService.js
const Job = require("../models/jobModel");

async function getUnpaidJobsByContract(contractId) {
  try {
    const unpaidJobs = await Job.findAll({
      where: {
        contractId: contractId,
        paid: false,
      },
    });
    return unpaidJobs;
  } catch (error) {
    throw new Error("Erro ao listar jobs não pagos");
  }
}

module.exports = {
  getUnpaidJobsByContract,
};
