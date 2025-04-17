const express = require("express");
const app = express();
const cors = require('cors')
const port = 3000;


const conexao = require("./database/conexao");
const tabelas = require("./database/tabelas");

const router = require("./routers/index");
const bodyParser = require('body-parser');
app.use(cors()) 

tabelas.init(conexao);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app,express);

app.listen(port, (error)=>{
    if(error){
        console.log("Ocorreu um erro ao rodar porta 3000 ");
        return;
    }
    console.log("Sucesso, porta 3000 funcionando");
});