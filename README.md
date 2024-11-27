
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
   npx sequelize-cli db:migrate
   ```

3. **Iniciar o servidor**
   ```bash
   npm start
   ```

4. **Testar os endpoints**
   - **Listar Contratos por Perfil**: `GET /contracts/:profileId`
   - **Fazer Depósito**: `POST /deposits` (Body: `{ "profileId": 1, "amount": 100 }`)
   - **Listar Trabalhos Não Pagos**: `GET /jobs/unpaid/:contractId`
