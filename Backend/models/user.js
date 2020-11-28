const sql = require('../db_connection.js');

const User = function (user) {
    this.email    = user.email;
    this.username = user.username;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.delete = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // user not found with the id
        result({ type: "not_found" }, null);
        return;
      }
  
      console.log("suppression de l'utilisateur n°", id);
      result(null, res);
    });
  };

  User.login = result => {
    sql.query("SELECT * FROM user WHERE email = ? AND password = ?", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(res);
      result(null, res);
    });
  };

User.getUsers = result => {
    sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(res);
      result(null, res);
    });
  };



// exports.login = database.query('SELECT * FROM user WHERE email=? AND password=?',[
//     email = "nathalie@example.com",
//     password = "password"
//     ],
//     function (error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//         return results;
//     });

module.exports = User;