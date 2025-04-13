const mysql = require("mysql2");


const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Senai@127",
    database: "BD_TESTE"

});

if(conexao){
    console.log("Banco de dados conectado com sucesso!");
}else{
    console.log("Ocorreu um erro ao se conectar com banco de dados!");
}

module.exports = conexao;


