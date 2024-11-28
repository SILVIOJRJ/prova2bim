
# Prova - Gerência de Configuração e Evolução de Software

Este projeto foi desenvolvido para atender os requisitos da prova.

## Requisitos Atendidos
1. Listar contratos de um perfil.
2. Fazer depósito em um perfil.
3. Listar trabalhos não pagos de um contrato.

## Instruções para Rodar

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Rodar migrações do banco**
   ```bash
   npx sequelize-cli db:migrate '(somente se houver problemas, fazer o npm start primeiro)'
   ```

3. **Iniciar o servidor**
   ```bash
   npm start
   ```

4. **Testar os endpoints**
   - **Listar Contratos por Perfil**: `GET http://localhost:3000/api/contracts/profile/2` - Apenas exemplo. O arquivo 'database.sqlite' lista as tabelas que já foram preenchidas.
   (Apenas o id 2 tem 2 contratos para conferir)
   - **Fazer Depósito**: `POST /deposits http://localhost:3000/api/deposits/1` (Body: { "profileId": 1, "amount": 100 })
   - **Listar Trabalhos Não Pagos**: `GET http://localhost:3000/api/jobs/unpaid/2` .


