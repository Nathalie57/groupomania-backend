const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const maskData = require('maskdata');
const jwt = require('jsonwebtoken');

// Create and Save a new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }
    // Create a User
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        // Store hash in your password DB.

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

// exports.login = (req, res, next) => {
//     User.login({ email: maskData.maskEmail2(req.body.email) })
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//         }
//         bcrypt.compare(req.body.password, user.password)
//           .then(valid => {
//             if (!valid) {
//               return res.status(401).json({ error: 'Mot de passe incorrect !' });
//             }
//             res.status(200).json({
//               userId: user._id,
//               token: jwt.sign(
//                 { userId: user._id },
//                 'RANDOM_TOKEN_SECRET',
//                 { expiresIn: '24h' }
//                 )
//             });
//           })
//           .catch(error => res.status(500).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
//   };

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