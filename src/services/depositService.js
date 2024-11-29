// src/services/depositService.js
const Profile = require("../models/profileModel");

async function depositToProfileService(profileId, amount) {
  const profile = await Profile.findByPk(profileId);

  if (!profile) {
    throw new Error("Perfil não encontrado");
  }

  profile.balance += amount;
  await profile.save();

  return profile;
}

module.exports = { depositToProfileService };
