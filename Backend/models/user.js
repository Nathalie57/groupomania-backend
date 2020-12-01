const sql = require('../db_connection.js');

const User = function (user) {
  this.email = user.email;
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

User.findOne = (email, result) => {
  sql.query(`SELECT * FROM user WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log(res[0]);
      result(null, res[0]);
      return;
    }
    result({ type: "not_found" }, null);
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

module.exports = User;