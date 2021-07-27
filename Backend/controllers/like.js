const Like = require("../models/like.js");
const jwt = require('jsonwebtoken');
const token = require("../utils/auth");
const { createLike } = require("../models/like.js");
const decode = token.decode;
var request;
var response;

function deleteLike(res, id_like) {
    Like.delete(id_like, (err, data) => {
        if (err) {
            if (err.type === "not_found") {
                res.status(404).send({
                    message: `Like non trouvé.`
                });
            } else {
                res.status(500).send({
                    message: "Impossible de supprimer ce like"
                });
            }
        } else res.send({ message: `Le like a été supprimé` });
    });
}

exports.manageLike = (req, res) => {
    const user = decode(req.headers.authorization);

    // console.log(":)", user);
    if (user.id === undefined) {
        return res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }
    Like.getLikeByUserByComment(
        [req.params.id_comment, user.id],
        (err, data) => {
            console.log(":P");
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: "Une erreur est survenue"
                });
            }          

            if (data.id === null) {
                 const like = new Like({
                    id_comment: req.params.id_comment,
                    id_user: user.id,
                    is_liked: 1
                });
                Like.createLike(like, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Une erreur est survenue"
                        });
                });
            };
            return deleteLike(res, data.id);
        } 
    );
}

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
        // console.log(data);
    });
};