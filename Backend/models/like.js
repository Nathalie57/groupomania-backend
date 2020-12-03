const sql = require('../db_connection.js');

const Like = function (like) {
    this.id_comment = like.id_comment;
    this.id_user = like.id_user;
    this.is_liked = like.is_liked;
};

Like.createLike = (newLike, result) => {
    sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log({ id: res.insertId, ...newLike });
        result(null, { id: res.insertId, ...newLike });
    });
};

Like.getLikeByUserByComment = (id_comment, result) => {
    sql.query("SELECT id_user FROM likes WHERE id_comment = ? AND is_liked IS NOT NULL", id_comment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Like.countLikes = (id_comment, result) => {
    sql.query("SELECT COUNT(*) FROM likes WHERE id_comment = ? AND is_liked IS NOT NULL", id_comment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

module.exports = Like;