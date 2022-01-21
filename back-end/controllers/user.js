const bcrypt = require("bcrypt");
const cryptojs = require('crypto-js');
//Importation pour l'utilisation des variables d'environnements
require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");
const Op = db.Sequelize.Op;

// Enregistrement d'un nouveau utilisateur
exports.signup = (req, res, next) => {
    //Chiffrer l'email avant l'envoi a la BD
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    db.user
        .findOne({ where: { email: emailCryptoJs } })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Adresse email déja utilisée!" });

            }
            bcrypt
                .hash(req.body.password, 10)
                .then((hash) => {
                    const user = {
                        username: req.body.username,
                        email: emailCryptoJs,
                        password: hash,
                        isAdmin: false,
                    };
                    db.user
                        .create(user)
                        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                        .catch((error) => res.status(400).json({ error }));
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Connecxion d'un utilisateur existant
exports.login = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    db.user
        .findOne({ where: { email: emailCryptoJs } })
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
    // on recupère userid du token jwt
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    console.log(req.body.password);
    db.user
        .findOne({
            where: { id: userId },
        })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé!" });
            }
            // comparer le MDP saisi et avec  celui la BDD
            bcrypt
                .compare(req.body.password, user.dataValues.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrecte !" });
                    }
                    //Supprimer le user avec tt ses posts 
                    db.user.destroy({ where: { id: userId } });
                    //  Tous les posts d'un user
                    db.post
                        .findAll({ where: { userId: userId } })
                        .then((result) => {
                            let postsId = [];
                            let postsUrlImage = [];
                            for (let i = 0; i < result.length; i++) {
                                postsId.push(result[i].id);
                                postsUrlImage.push(result[i].imgURL.split("/images/")[1]);
                            }
                            // Images des posts
                            for (let i = 0; i < postsUrlImage.length; i++) {
                                fs.unlink(`images/${postsUrlImage[i]}`, (err) => {
                                    if (err) {
                                        console.log(`images/${postsUrlImage[i]} not found !`);
                                    } else {
                                        console.log(`deleted old images/${postsUrlImage[i]}`);
                                    }
                                });
                            }
                            //Suppression des commentaires du user et commentaires des post d'un user supprimé  
                            db.comment.destroy({
                                where: {
                                    [Op.or]: [{ authorId: userId }, { postId: postsId }],
                                },
                            });
                            //Suppression des posts d'un user
                            db.post.destroy({ where: { userId: userId } }).then(() => {
                                res.status(200).json({ message: "Utilisateur supprimé" });
                            });
                        })
                        .catch((error) => res.status(401).json({ error }));
                });
        })
        .catch((error) => res.status(500).json({ error }));

};
//Afficher l'administrateur
exports.getAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    db.user
        .findOne({
            attributes: ["isAdmin"],
            where: { id: userId },
        })
        .then((user) => {
            if (user.dataValues.isAdmin == "1") {
                db.user
                    .findAll({
                        where: { isAdmin: "1" },
                    })
                    .then((users) => {
                        res.status(200).json({ users });
                    })
                    .catch((error) => res.status(500).json({ error }));
            } else {
                throw new Error("unauthorized");
            }
        })
        .catch((error) => res.status(500).json({ error }));

};
//Trouver un user 
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