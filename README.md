# Projeto de Gerenciamento de Contratos

Este projeto é uma aplicação que gerencia contratos, perfis e trabalhos utilizando **Node.js** e **SQLite**. Ele foi desenvolvido com **Sequelize** para facilitar a interação com o banco de dados.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado na sua máquina:

- **Node.js** (versão 14 ou superior)
- **NPM** (geralmente instalado junto com o Node.js)

---

## 🚀 Como Executar o Projeto

### 1. Instale as Dependências

Na raiz do projeto, rode o comando:
```bash
npm install
```

### 2. Inicie o Servidor

Para iniciar o servidor, execute:
```bash
npm start
```

O servidor estará disponível em:  
**URL Base**: `http://localhost:3000`

---

## 📦 Endpoints Disponíveis

### 1. Listar Todos os Contratos de um Perfil

**Rota**: `GET /api/contracts/profiles/:profileId/contracts`  
**Descrição**: Retorna todos os contratos de um perfil específico.  

**Exemplo de Requisição no Postman**:
- **URL**: `http://localhost:3000/api/contracts/profiles/1/contracts`
- **Método**: `GET`

---

### 2. Realizar Depósito para um Perfil

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

## 🛠️ Como Testar os Endpoints no Postman

1. **Inicie o servidor**:  
   Certifique-se de que o servidor está rodando usando o comando `npm start`.

2. **Popular o banco de dados (opcional)**:
   Faça uma requisição `POST` para o endpoint `/api/seed` para garantir que os dados de exemplo estão inseridos no banco.

3. **Realize os testes de cada endpoint**:  
   Configure as requisições no Postman utilizando os exemplos fornecidos acima.

---

## 🗂️ Estrutura do Projeto

```
├── scripts/
│   └── seedData.js        # Script para popular o banco de dados
├── src/
│   ├── config/            # Configurações (ex.: conexão com o banco)
│   ├── controllers/       # Controladores (lógica das rotas)
│   ├── models/            # Modelos do banco de dados
│   ├── routes/            # Arquivo de rotas da aplicação
│   ├── services/          # Serviços adicionais
├── db.sqlite              # Arquivo do banco de dados SQLite
├── .env                   # Variáveis de ambiente
├── server.js              # Arquivo principal do servidor
├── app.js                 # Configuração inicial do app
├── package.json           # Gerenciador de dependências e scripts
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para interagir com o banco de dados.
- **SQLite**: Banco de dados leve e rápido.
- **dotenv**: Gerenciamento de variáveis de ambiente.

---

## ⚠️ Dicas e Cuidados

- O arquivo `db.sqlite` é o banco de dados utilizado pela aplicação.  
  Caso você precise resetá-lo, basta deletar o arquivo e rodar o endpoint `/api/seed` para recriar os dados.

---

## 📖 Autor

- **Andrick**  
  GitHub: [AndrickDev](https://github.com/AndrickDev)
