const sql = require('../db_connection.js');

const Comment = function (comment) {
    console.log(comment.image);
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

Comment.deleteByAdmin = (id, result) => {
    sql.query("DELETE FROM comment WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // comment not found with the id
            result({ type: "not_found" }, null);
            return;
        }

        console.log("suppression du commentaire n°", id);
        result(null, res);
    });
};

Comment.deleteByUser = ([id, id_user], result) => {
    sql.query("DELETE FROM comment WHERE id = ? AND id_user = ?", [id, id_user], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // comment not found with the id
            result({ type: "not_found" }, null);
            return;
        }

        console.log("suppression du commentaire n°", id);
        result(null, res);
    });
};

Comment.getMainComments = result => {
    sql.query("SELECT comment.id, comment.id_user, username, content, created_at, image, id_parent FROM user INNER JOIN comment ON user.id = comment.id_user WHERE id_parent IS NULL ORDER BY id DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Comment.getSingleComment = (id, result) => {
    sql.query("SELECT * FROM comment WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length == 0) {
            result({ type: "not_found" }, null);
            return;
        }
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

        result(null, res);
    });
};

Comment.getChildComments = (id_parent, result) => {
    sql.query("SELECT comment.id, username, content, created_at, image, id_parent FROM user INNER JOIN comment ON user.id = comment.id_user WHERE id_parent = ? ORDER BY id ASC", id_parent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Comment.getCommentsByUser = (id_user, result) => {
    sql.query(`SELECT * FROM comment WHERE id_user = ? AND id_parent IS NULL`, id_user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Comment.countComments = (id_parent, result) => {
    sql.query("SELECT COUNT(id_parent) FROM comment WHERE id_parent = ?", id_parent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Comment;