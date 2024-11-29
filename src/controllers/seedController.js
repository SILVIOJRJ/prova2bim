// src/controllers/seedController.js
const { seedData } = require("../../scripts/seedData");  // Importando o script de seed

async function seedDatabase(req, res) {
  try {
    await seedData();  // Executa a função do script que popula o banco de dados

    res.status(200).json({ message: "Banco de dados populado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao popular o banco de dados", error });
  }
}

module.exports = { seedDatabase };
