const express = require('express');
const router  = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUserById);
router.post('/signup', userCtrl.create);
router.delete('/:id', userCtrl.delete);
router.post('/login', userCtrl.login);

module.exports = router;