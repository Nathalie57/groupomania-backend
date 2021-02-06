const sql = require('../db_connection.js');

const Like = function (like) {
    this.id_comment = like.id_comment;
    this.id_user = like.id_user;
    this.is_liked = like.is_liked;
};

Like.createLike = (newLike, result) => {
    console.log(newLike)
    sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created like: ", { id: res.insertId, ...newLike });
        result(null, { id: res.insertId, ...newLike });
    });
};

Like.updateLike = ([id_comment, id_user], like, result) => {
    sql.query(
      "UPDATE likes SET is_liked = 0 WHERE id_comment = ? and id_user = ?", [id_comment, id_user],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found like with the id
          result({ kind: "not_found" }, null);
          return;
        }
        return;
      }
    );
  };

Like.getLikeByUserByComment = ([id_comment, id_user] , result) => {
    let found = {id : null};
    const query = sql.query("SELECT id FROM likes WHERE id_comment = ? AND id_user = ? LIMIT 1", [id_comment, id_user]);
    query
        .on('error', function (err) {
            // Handle error, an 'end' event will be emitted after this as well
            console.log("err======", err);
            result(err,null);
        })
        // .on('fields', function (fields) {
        //     // the field packets for the rows to follow
        //     console.log("fields======", fields)
        // })
        .on('result', function (row) {
            console.log("======", row);
            found = row;
        })
        .on('end', function () {
            console.log("======END" );
            result(null,found);
        });
}

Like.countLikes = (id_comment, result) => {
    sql.query("SELECT COUNT(*) FROM likes WHERE id_comment = ? AND is_liked = 1", id_comment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log(res);
        result(null, res);
    });
};

Like.existComment = (idPost) => {
    sql.query("SELECT id FROM comment WHERE id = ? LIMIT 1", idPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            throw (err);
        }
        if (res.length > 0) return true;
        return false;
    });
}

Like.delete = (id, result) => {
    sql.query("DELETE FROM likes WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // like not found with the id
            result({ type: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Like;