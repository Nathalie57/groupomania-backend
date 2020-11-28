const sql = require('../db_connection.js');

const Comment = function (comment) {
    this.content = comment.content;
    this.image = comment.image;
    this.created_at = comment.created_at;
    this.id_user = comment.id_user;
    this.id_parent = comment.id_parent;
}

Comment.createComment = (newComment, result) => {
    sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created comment: ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

Comment.createReply = (newReply, result) => {
    sql.query("INSERT INTO comment SET ?", newReply, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created reply: ", { id: res.insertId, ...newReply });
        result(null, { id: res.insertId, ...newReply });
    });
};

Comment.getMainComments = result => {
    sql.query("SELECT * FROM comment WHERE id_parent IS NULL ORDER BY created_at DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Comment.getSingleMainComment = (id, result) => {
    sql.query("SELECT * FROM comment WHERE id = ? AND id_parent IS NULL", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length == 0) {
            // user not found with the id
            result({ type: "not_found" }, null);
            return;
        }

        console.log(res);
        result(null, res);
    });
};

Comment.getChildComments = (id_parent, result) => {
    sql.query("SELECT * FROM comment WHERE id_parent = ? ", id_parent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // if (res.length == 0) {
        //     // user not found with the id
        //     result({ type: "not_found" }, null);
        //     return;
        // }

        console.log(res);
        result(null, res);
    });
};

module.exports = Comment;