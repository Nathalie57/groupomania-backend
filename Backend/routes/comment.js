const express = require('express');
const router  = express.Router();

const commentCtrl = require('../controllers/comment');

router.get('/', commentCtrl.getMainComments);
router.get('/:id', commentCtrl.getSingleMainComment);
router.get('/:id_parent/childcomments', commentCtrl.getChildComments);
router.post('/', commentCtrl.createComment);
router.post('/replies', commentCtrl.createReply);

module.exports = router;