const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
var cors = require("cors");
const userRoutes = require("./routes/user");
const tacheRoutes = require("./routes/tache");
const db = require("./models");

const app = express();
// Configuration cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
db.sequelize.sync();
app.use("/api/auth", userRoutes);
app.use("/api/taches", tacheRoutes);


// exporter cette const app pour qu'on puisse y acceder depuis les autres fichiers
module.exports = app;