const Comment = require("../models/comment.js");
const token = require("../utils/auth");
const today = require("../utils/date");
const fs = require('fs');
const decode = token.decode;
const date = today.today;

exports.createComment = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }
    const user = decode(req.headers.authorization);
    console.log("blibli", req.file);
    const comment = new Comment({
        content: req.body.content,
        // image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null ),
        created_at: date,
        id_user: user.id,
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
    const user = decode(req.headers.authorization);
    console.log("blabla", req.file, "fdfd", req.params);
    const reply = new Comment({
        content: req.body.content,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null ),
        // image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        created_at: date,
        id_user: user.id,
        id_parent: req.params.id_parent
    });
    Comment.createComment(reply, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue"
            });
        else res.send(data);
    });
};

// exports.getSingleComment = (req, res) => {
//     Comment.getSingleComment(req.params.id, (err, data) => {
//         if (err) {
//             if (err.type === "not_found") {
//                 res.status(404).send({
//                     message: `Ce commentaire n'existe pas`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Une erreur est survenue"
//                 });
//             }
//         } else res.send(data);
//     });
// };

// exports.update = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({
//             message: "Le contenu ne peut pas être vide"
//         });
//     }
//     console.log(req.body);
//     const user = decode(req.headers.authorization);
//     Comment.update(
//         [req.params.id, 
//         user.id],
//         new Comment(req.body),
//         (err, data) => {
//             if (err) {
//                 if (err.type === "not_found") {
//                     res.status(404).send({
//                         message: "Commentaire non trouvé"
//                     });
//                 } else {
//                     res.status(500).send({
//                         message: "Le commentaire n'a pas été modifié"
//                     });
//                 }
//             } else res.send(data);
//         }
//     );
// };

exports.delete = (req, res) => {
    const user = decode(req.headers.authorization);
    if (user.role === 1) {
        Comment.deleteByAdmin(req.params.id, (err, data) => {
            if (err) {
                if (err.type === "not_found") {
                    res.status(404).send({
                        message: `Commentaire n°${req.params.id} non trouvé.`
                    });
                } else {
                    res.status(500).send({
                        message: "Impossible de supprimer le commentaire " + req.params.id
                    });
                }
            } else res.send({ message: `Le commentaire n°${req.params.id} a été supprimé` });
        });
    } else {
        Comment.deleteByUser([req.params.id, user.id], (err, data) => {
            if (err) {
                if (err.type === "not_found") {
                    res.status(401).send({
                        message: `Vous n'avez pas l'autorisation d'effacer ce commentaire`
                    });
                } else {
                    res.status(500).send({
                        message: "Impossible de supprimer le commentaire " + req.params.id
                    });
                }
            } else res.send({ message: `Le commentaire n°${req.params.id} a été supprimé` });
        });
    }
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

exports.getCommentsByUser = (req, res) => {
    Comment.getCommentsByUser(req.params.id_user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id_user}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.id_user
                });
            }
        } else res.send(data);
    });
};

exports.countRepliesByComment = (req, res) => {
    Comment.countComments(req.params.id, (err, data) => {
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