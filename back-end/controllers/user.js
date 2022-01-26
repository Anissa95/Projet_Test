const bcrypt = require("bcrypt");
//Importation pour l'utilisation des variables d'environnements
require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");
const Op = db.Sequelize.Op;

// Enregistrement d'un nouveau utilisateur
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: false,
            };
            db.user
                .create(user)
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Connecxion d'un utilisateur existant
exports.login = (req, res, next) => {
    db.user
        .findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            // on compare le mdp entré par l'utilisateur avec le hash enregistré dans la BD
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    return res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, {
                            expiresIn: "1h",
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
//Supprission d'un utilisateur
exports.deleteUser = (req, res, next) => {

};

//Trouver un user 
exports.findUser = (req, res, next) => {

};
//Récuperer tous les utilisateurs
exports.getUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    db.user
        .findOne({
            attributes: ["username", "email", "id", "isAdmin"],
            where: { id: userId },
        })
        .then((user) => {
            res.status(200).json({ user });
        })
        .catch((error) => res.status(500).json({ error }));
};