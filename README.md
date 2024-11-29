
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
### 1. Listar Todos os Contratos de um Perfil

**Rota**: `GET /api/contracts/profiles/:profileId/contracts`  
**Descrição**: Retorna todos os contratos de um perfil específico.  

**Exemplo de Requisição no Postman**:
- **URL**: `http://localhost:3000/api/contracts/profiles/1/contracts`
- **Método**: `GET`

---

### . Realizar Depósito para um Perfil

**Rota**: `POST /api/deposits`  
**Descrição**: Adiciona um valor ao saldo de um perfil específico.  

**Body da Requisição**:
```json
{
  "profileId": 1,
  "amount": 500.00
}
```

**Exemplo de Requisição no Postman**:
- **URL**: `http://localhost:3000/api/deposits`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "profileId": 1,
    "amount": 500.00
  }
  ```

---

### 3. Listar Trabalhos Não Pagos de um Contrato

**Rota**: `GET /api/jobs/unpaid`  
**Descrição**: Retorna todos os trabalhos de contratos que não foram pagos integralmente.  

**Exemplo de Requisição no Postman**:
- **URL**: `http://localhost:3000/api/jobs/unpaid`
- **Método**: `GET`

---

### 4. Popular o Banco de Dados

**Rota**: `POST /api/seed`  
**Descrição**: Executa o script de seed para popular o banco de dados com dados de exemplo.  

**Exemplo de Requisição no Postman**:
- **URL**: `http://localhost:3000/api/seed`
- **Método**: `POST`

**Dados Inseridos pelo Script**:
- **Profiles**:
  - ID: 1, Nome: John Doe, Profissão: Developer, Saldo: 2000, Tipo: Client
- **Contracts**:
  - ID: 1, Termos: "Termos do contrato X", ClientId: 1, Status: "Ativo"
- **Jobs**:
  - ID: 1, Descrição: "Desenvolvimento de Software", Preço: 1500, Pago: false
  - ID: 2, Descrição: "Testes de Software", Preço: 500, Pago: false

---

##  Endpoints no Postman

1. **Inicie o servidor**:  
   Certifique-se de que o servidor está rodando usando o comando `npm start`.

2. **Popular o banco de dados (opcional)**:
   Faça uma requisição `POST` para o endpoint `/api/seed` para garantir que os dados de exemplo estão inseridos no banco.

3. **Realize os testes de cada endpoint**:  
   Configure as requisições no Postman utilizando os exemplos fornecidos acima.

---


