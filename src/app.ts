import express from 'express';
import { sequelize } from './config/database'; // Certifique-se de que o caminho esteja correto
import router from './routes/index';

const app = express();
app.use(express.json());
app.use('/api', router);

// Sincronizar banco de dados e criar tabelas automaticamente
sequelize.sync({ force: false }) // Altere para `true` se quiser recriar tabelas a cada execução
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
