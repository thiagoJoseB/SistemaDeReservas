const router = require("./Route");

module.exports = (app,express) =>{
    app.use(router);

app.use('/api/auth', router);
app.use(express.json());
app.use(express.urlencoded({extended: true}))
};