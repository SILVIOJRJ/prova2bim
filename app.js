const express = require("express");
const contractRoutes = require("./src/routes/contractRoutes");
const depositRoutes = require("./src/routes/depositRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const seedRoutes = require("./src/routes/seedRoutes");  // Importando a rota de seed
const sequelize = require("./src/config/dbConfig");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/contracts", contractRoutes);
app.use("/api/deposits", depositRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", seedRoutes);  // Registrando a rota de seed

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");
    await sequelize.sync({ force: false }); // Não precisa recriar o banco toda vez

  } catch (error) {
    console.error("Erro ao conectar ou sincronizar com o banco de dados:", error.message);
  }
})();

module.exports = app;
