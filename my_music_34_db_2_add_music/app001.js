'use strict';
const express = require('express');
let app = express();
app.listen(9999,()=>{
    console.log('34期服务器启动在9999端口');
});
const db = require('./models/db');
const bodyParser = require('./models/db');
const formidable = require('formidable');
const path = require('path');
const session = require('express-session');
app.engine('html',require('express-art-template'));

let router = express.Rouber();
router.get('/test',(req,res,next)=>{
    db.q('select * from album_dir',[],(err,data)=>{
        if(err)eturn next(err);
        res.render('test.html',{
            text:data[0].dir
        });
    })
})
.post('/api/check-user',(req,res,next)=>{
    let username = req.body.username;
    db.q('select * from users where username = ?',[username],(err,data)=>{
        if(err) return next(err);
        if(data.length == 0){
            res.json({
                code:'001',
                msg:'可以注册'
            })
        }else{
            res.json({
                code:'002',msg:'用户名已经存在'
            })
        }
    })
})
.post('/api/do-register',(req,res,next)=>{
    let userData = req.body;
    let username = userData.username;
    let password = userData.password;
    let v_code = userData.v_code;
    let email = userData.email;

    let regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if(!regex.test(email)){
        res.json({
            code:'004',msg:'邮箱不合法'
        });
        return;
    }
    db.q('select * from users username = ? or email = ?' ,[username,email],(err,data)=>{
        if(err) return next(err);
        if(data.length != 0){
            let user = data[0];
            if(user.email == email){
                return res.json({
                    code:'002',msg:'邮箱已经注册'
                });
            }else if( user.username == username){
                return res.json({
                    code:'002',msg:'用户名已经注册'
                });
            }
        }else{
            db.q('insert into users (username,password,email) values (?,?,?)',[username,password,email],(err,result)=>{
                if(err) return next(err);
                console.log(result);
                res.json({
                    code:'001',msg:'注册成功'
                })
            })
        }
    })



})

