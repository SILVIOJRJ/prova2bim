// src/controllers/jobController.js
const { getUnpaidJobsByContract } = require("../services/jobService");

async function listUnpaidJobs(req, res) {
  const { contractId } = req.params;

  try {
    const unpaidJobs = await getUnpaidJobsByContract(contractId);

    if (unpaidJobs.length === 0) {
      return res.status(404).json({ message: "Nenhum job não pago encontrado para este contrato." });
    }

    res.json(unpaidJobs);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar jobs não pagos.", error });
  }
}

module.exports = { listUnpaidJobs };
