const Like = require("../models/like.js");
const jwt = require('jsonwebtoken');
const token = require("../utils/auth");
const decode = token.decode;
var request;
var response;

exports.createLike = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }
    request = req;
    response = res;
    Like.existComment(req.params.id_comment, afterCheckExist);
    
};

afterCheckExist = function(exists){
    if(!exists) {
        response.status(400).send({message: "Le commentaire n'existe pas"});
        return;
    }
    const user = decode(request.headers.authorization);
    const like = new Like({
        id_comment: request.params.id_comment,
        id_user: user.id,
        is_liked: true
    });
    Like.createLike(like, (err, data) => {
        if (err)
            response.status(500).send({
                message:
                    err.message || "Une erreur est survenue"
            });
        else response.send(data);
    });
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
        console.log(data);
    });
};