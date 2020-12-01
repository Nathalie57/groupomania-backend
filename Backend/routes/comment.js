const express = require('express');
const router  = express.Router();

const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

const commentCtrl = require('../controllers/comment');

router.get('/', auth, commentCtrl.getMainComments);
router.get('/:id', auth, commentCtrl.getSingleMainComment);
router.get('/:id_parent/childcomments', auth, commentCtrl.getChildComments);
router.get('/user/:id_user', auth, commentCtrl.getCommentsByUser);

router.post('/', auth, multer, commentCtrl.createComment);
router.post('/replies', auth, multer, commentCtrl.createReply);

router.put('/:id', auth, commentCtrl.update);

router.delete('/:id', auth, commentCtrl.delete);

module.exports = router;