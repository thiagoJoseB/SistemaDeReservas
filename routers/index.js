const routerCliente = require("./ClienteRoute");

module.exports = (app,express) =>{
    app.use(routerCliente);

app.use('/api/auth', routerCliente);
app.use(express.json());
app.use(express.urlencoded({extended: true}))
};