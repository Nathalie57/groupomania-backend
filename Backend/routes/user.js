const express = require('express');
const router  = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const bouncer = require ("express-bouncer")(500, 900000);

bouncer.blocked = function (req, res, next, remaining)
{
    res.send (429, "Too many requests have been made, " +
        "please wait " + remaining / 1000 + " seconds");
};

router.get('/', auth, userCtrl.getUsers);
router.get('/:id', auth, userCtrl.getUserById);
router.post('/signup', userCtrl.create);
router.delete('/:id', auth, userCtrl.delete);
router.post('/login', bouncer.block, userCtrl.login);

module.exports = router;