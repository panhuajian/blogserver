let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');
let path = require('path');

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}

var mysql = require('mysql');
var express = require('express');
var app = express();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123phjdmy.',
  database: 'blog'
});

const selectSql = 'select * from user'


module.exports = {

    user (req, res) {
        connection.query(selectSql, function(err, rows) {
            if (err) throw err;
            // for (var i = 0; i < rows.length; i++) {
                // console.log(rows[i].username)
                // arr[i] = rows[i].username;
            // }
          
            //把搜索值输出
            // app.get('/', function(req, res) {
            //     res.send(arr);
            // });
            res.send({data: rows[0]});
          });
    },
    // 获取商品列表
    fetchAll (req, res) {
        func.connPool(sql.queryAll, 'goods', rows => {
            rows = formatData(rows);
            res.send();
        });
    },

    // 获取商品详情
    fetchById (req, res) {
        let id = req.body.id;

        func.connPool(sql.queryById, ['user', id], rows => {
            console.log(1111111111)
            rows = formatData(rows);
            res.send({code: 200, msg: 'ok', goods: rows[0]});
        });

    },

    // 添加|更新 商品
    addOne (req, res) {
        let id = req.body.id;
        console.log(id);
        let name = req.body.name;
        let price = req.body.price;
        let query, arr;

        if (id) {
            // 更新
            query = 'UPDATE goods SET name=?, price=? WHERE id=?';
            arr = [name, price, id];
        } else {
            // 新增
            query = 'INSERT INTO goods(name, price) VALUES(?,?)';
            arr = [name, price];
        }

        func.connPool(query, arr, rows => {
            res.send({code: 200, msg: 'done'});

        });

    },


    // 删除商品
    deleteOne (req, res) {

        let id = req.body.id;

        func.connPool(sql.del, ['goods', id], rows => {
            res.send({code: 200, msg: 'done'});

        });

    },

    // 批量删除
    deleteMulti (req, res) {
        let id = req.body.id;

        func.connPool('DELETE FROM goods WHERE id IN ?', [[id]], rows => {
            res.send({code: 200, msg: 'done'});

        });

    },

    uploadGoodsImg (req, res) {
        let absolutePath = path.resolve(__dirname, req.file.path);
        let a  = 2;

        func.connPool('UPDATE goods SET imgs = ? WHERE id = ?', [absolutePath, 60], (err, rows) => {
            console.log(a);
            res.send({code: 200, msg: 'done', url: absolutePath});
        }, res);
    },
};