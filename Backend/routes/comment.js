const express = require('express');
const router  = express.Router();

const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like');

router.get('/', auth, commentCtrl.getMainComments);
router.get('/:id', auth, commentCtrl.getSingleMainComment);
router.get('/:id/countReplies', auth, commentCtrl.countRepliesByComment);
router.get('/:id_parent/childcomments', auth, commentCtrl.getChildComments);
router.get('/user/:id_user', auth, commentCtrl.getCommentsByUser);
router.get('/:id_comment/likes', auth, likeCtrl.countLikesByComment);
router.get('/:id_comment/userLiked', auth, likeCtrl.getLikeByUserByComment);

router.post('/', auth, multer, commentCtrl.createComment);
router.post('/:id_parent/replies', auth, multer, commentCtrl.createReply);
router.post('/:id_comment/likes', auth, likeCtrl.manageLike);

router.delete('/:id', auth, commentCtrl.delete);

module.exports = router;