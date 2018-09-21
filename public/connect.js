const mysql = require('mysql');
const db = require('../configs/db');
const pool = mysql.createPool(db);

module.exports = {
  connPool (sql, callback) {
    pool.getConnection((err, conn) => {
      conn.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        callback(err, rows);
        conn.release();
      });
    });
  },
    // json格式
  writeJson(res, code = 200, msg = 'ok', data = null) {
    let obj = {code, msg, data};
    if (!data) {
      delete obj.data;
    }
    res.send(obj);
  }
};