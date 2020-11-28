const Comment = require("../models/comment.js");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
today = yyyy + '-' + mm + '-' + dd + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

exports.createComment = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }
    const comment = new Comment({
        content: req.body.content,
        image: req.body.image,
        created_at: today,
        id_user: req.body.id_user,
        id_parent: null
    });
    Comment.createComment(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue"
            });
        else res.send(data);
    });
};

exports.createReply = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }
    const reply = new Comment({
        content: req.body.content,
        image: req.body.image,
        created_at: today,
        id_user: req.body.id_user,
        id_parent: req.body.id_parent
    });
    Comment.createReply(reply, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue"
            });
        else res.send(data);
    });
};

exports.getMainComments = (req, res) => {
    Comment.getMainComments((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue"
            });
        else res.send(data);
    });
};

exports.getSingleMainComment = (req, res) => {
    Comment.getSingleMainComment(req.params.id, (err, data) => {
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

exports.getChildComments = (req, res) => {
    Comment.getChildComments(req.params.id_parent, (err, data) => {
        if (err) {

            res.status(500).send({
                message: "Une erreur est survenue"
            });

        } else res.send(data);
    });
};