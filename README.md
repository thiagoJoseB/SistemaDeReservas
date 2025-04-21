## 🛠️ Como rodar o projeto

### 1. Clonar o repositório

https://github.com/thiagoJoseB/SistemaDeReservas
cd SistemaDeReservas

### 2. Instalar dependências
npm install

###  3. Criar o banco de dados MySQL
Abra seu cliente MySQL e execute os comandos abaixo:

CREATE DATABASE BD_TESTE
use BD_TESTE

CREATE TABLE Cliente (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(32) NOT NULL,
    cpf VARCHAR(32) NOT NULL,
    data_criacao TIMESTAMP 
);


CREATE TABLE Locacao (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    descricao TEXT ,
    valor_hora DECIMAL(10,2) NOT NULL,
    tempo_minimo INTEGER not null,
    tempo_maximo INTEGER not null,
    data_criacao TIMESTAMP
);




CREATE TABLE  Reserva(
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  	cliente_id INTEGER NOT NULL,
    locacao_id INTEGER NOT NULL,
    data_inicio DateTime NOT NULL ,
     data_fim DateTime NOT NULL ,
      valor_final DECIMAL(10,2) NOT NULL,
      situacao VARCHAR(100) NOT NULL,
      data_criacao TIMESTAMP ,
      
        CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES Cliente(id),

    CONSTRAINT fk_locacao FOREIGN KEY (locacao_id) REFERENCES Locacao(id)
     
)

###  4. Configurar a conexão com o banco
Abra o arquivo: database/conexao.js E edite com as configurações do seu banco de dados:

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "SUA SENHA",
    database: "BD_TESTE"

});

###  5. Iniciar o projeto
Dentro da pasta principal (SistemaDeReservas) rode o comando
nodemon /index

