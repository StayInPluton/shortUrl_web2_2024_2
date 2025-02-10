
# 🔗 Projeto: Encurtador de URL

Este projeto é parte da **segunda avaliação da segunda unidade** da disciplina **Desenvolvimento para Web 2**. O objetivo é criar um **encurtador de URL** usando **React** no front-end e **Express** no back-end. O sistema permite o registro de usuários, login e gerenciamento de URLs encurtadas, com autenticação JWT.

---

## 📚 Tecnologias Utilizadas
- **Back-end**: Node.js, Express, Sequelize, JWT, Bcrypt, nanoid 
- **Front-end**: React, Axios, Bulma 
- **Banco de Dados**: MySQL  

---

## 🚀 Como rodar o projeto  

### 1️⃣ Back-end (Express)
1. Certifique-se de ter o **Node.js** e o **MySQL** instalados.  
2. No terminal, navegue até a pasta `backend`.  
3. Instale as dependências:  
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz de `backend` com as seguintes informações:  
   ```
   JWT_SECRET=sua_chave_secreta
   DB_NAME=nome_do_banco
   DB_USER=usuario_do_banco
   DB_PASS=senha_do_banco
   DB_HOST=localhost
   DB_PORT=3306
   ```
5. Execute as migrações do banco de dados:  
   ```bash
   npx sequelize db:migrate
   ```
6. Inicie o servidor Express:  
   ```bash
   npm start
   ```
   O servidor estará disponível em `http://localhost:5000`.

---

### 2️⃣ Front-end (React)  
1. No terminal, navegue até a pasta `frontend`.  
2. Instale as dependências:  
   ```bash
   npm install
   ```
3. Inicie o projeto React:  
   ```bash
   npm start
   ```
   O React estará disponível em `http://localhost:3000`.

---

## 🔐 Autenticação
- O sistema utiliza **JWT** para autenticação.  
- Senhas são armazenadas de forma segura e usando **bcrypt** para comparação.  

## 📂 Estrutura de Pastas
```
/backend      -> Código do servidor Express (API REST)  
/frontend     -> Aplicação React (interface do usuário)
```

---

## 🛠 Funcionalidades Implementadas
- Registro e login de usuários (com validação de e-mail e confirmação de senha)  
- Criação e listagem de URLs encurtadas  
- Autenticação por JWT  
- Proteção de rotas no back-end  

---

## 💡 Observação
Certifique-se de que o **back-end** e o **front-end** estejam rodando ao mesmo tempo para que a aplicação funcione corretamente.
