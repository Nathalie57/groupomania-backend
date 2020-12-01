const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const maskData = require('maskdata');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }
    // Create a User
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const user = new User({
            email: maskData.maskEmail2(req.body.email),
            username: req.body.username,
            password: hash
        });
        // Save User in the database
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Une erreur est survenue"
                });
            else res.send(data);
        });
    });
};

exports.login = (req, res) => {

    User.findOne(maskData.maskEmail2(req.body.email), (err, data) => {
        console.log("..", err, data.id);
        bcrypt.compare(req.body.password, data.password, function (error, response) {
            if (error) {
                if (error.type === "not_found") {
                    res.status(404).send({
                        message: `Pas d'utilisateur avec l'email ${req.body.email}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Une erreur est survenue"
                    });
                }
            };
            res.status(200).json({
                userId: data.id,
                is_admin: data.is_admin,
                token: jwt.sign(
                    {
                        userId: data.id,
                        is_admin: data.is_admin,
                    },
                    'RANDOM_TOKEN_SECRET',
                    {
                        expiresIn: '24h',
                    }
                ),
            });
        });

    });
};

exports.delete = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.type === "not_found") {
                res.status(404).send({
                    message: `Utilisateur n°${req.params.id} non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer l'utilisateur " + req.params.id
                });
            }
        } else res.send({ message: `L'utilisateur n°${req.params.id} a été supprimé` });
    });
};

exports.getUsers = (req, res) => {
    User.getUsers((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue"
            });
        else res.send(data);
    });
};