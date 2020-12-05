const Like = require("../models/like.js");
const jwt = require('jsonwebtoken');
const token = require("../utils/auth");
const decode = token.decode;

exports.createLike = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }
    const user = decode(req.headers.authorization);
    const like = new Like({
        id_comment: req.params.id_comment,
        id_user: user.id,
        is_liked: true
    });
    Like.createLike(like, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue"
            });
        else res.send(data);
    });
};

exports.getLikeByUserByComment = (req, res) => {
    Like.getLikeByUserByComment(req.params.id_comment, (err, data) => {
        if (err) {
            if (err.type === "not_found") {
                res.status(404).send({
                    message: `Ce commentaire n'existe pas`
                });
            } else {
                res.status(500).send({
                    message: "Une erreur est survenue"
                });
            }
        } else res.send(data);
    });
};

exports.countLikesByComment = (req, res) => {
    Like.countLikes(req.params.id_comment, (err, data) => {
        if (err) {
            if (err.type === "not_found") {
                res.status(404).send({
                    message: `Ce commentaire n'existe pas`
                });
            } else {
                res.status(500).send({
                    message: "Une erreur est survenue"
                });
            }
        } else res.send(data);
    });
};