const express = require('express');
const router  = express.Router();

const userCtrl = require('../controllers/user');
const bouncer = require ("express-bouncer")(500, 900000);

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUserById);
router.post('/signup', userCtrl.create);
router.delete('/:id', userCtrl.delete);
router.post('/login', /*bouncer.block,*/ userCtrl.login);

module.exports = router;