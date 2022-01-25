const db = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Afficher toutes les taches 
exports.getAllTache = (req, res, next) => {
    db.tache
        .findAll({
            order: [
                ['createdAt', 'DESC'],

            ]
        })
        .then(taches => res.status(200).json(taches))
        .catch(error => res.status(400).json({ error }));
};

//Lire un post un post
exports.getOneTache = (req, res, next) => {
    db.tache
        .findOne({
            where: { id: req.params.id },
        })
        .then((tache) => {
            res.status(200).json({
                tache,
            });
        })
        .catch((error) => res.status(400).json({ error }));
};

//Créer une tache
exports.createTache = (req, res, next) => {
    // recuperer le token dans le header authorization
    const token = req.headers.authorization.split(" ")[1];
    // on decode le token avec fonction verify de jwt, le token payload et sa clé secrète en argument
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    db.user
        .findOne({
            attributes: ["username"],
            where: { id: userId },
        })
        .then((user) => {
            console.log(user);
            const newTache = {
                userId: userId,
                tache: req.body.tache,
                heureDebut: req.body.heureDebut,
                heureFin: req.body.heureFin,
            };
            db.tache
                .create(newTache)
                .then(() => {
                    res.status(201).json({ message: `tache Créé avec Succès ` });
                })
                .catch((error) => res.status(500).json({ error: `Impossible de Créer la tache !!` }));
        });
};
//  modifier une tache
exports.updateTache = (req, res, next) => {

};

// supprimer une tache
exports.deleteTache = (req, res, next) => {

};