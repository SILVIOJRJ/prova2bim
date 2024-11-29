// src/controllers/depositController.js
const { depositToProfileService } = require("../services/depositService");

async function depositToProfile(req, res) {
  const { profileId } = req.params;
  const { amount } = req.body;  // O valor a ser depositado

  try {
    if (amount <= 0) {
      return res.status(400).json({ message: "O valor do depósito deve ser maior que zero." });
    }

    const updatedProfile = await depositToProfileService(profileId, amount);

    res.status(200).json({
      message: "Depósito realizado com sucesso!",
      updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar depósito.", error });
  }
}

module.exports = { depositToProfile };
