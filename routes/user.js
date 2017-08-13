let express = require('express');
let router = express.Router();
router.get('/signup',function(req,res){
  //渲染模板 1参数是相对路径
  res.render('user/signup',{title:'用户注册'});
});
router.post('/signup',function(req,res){
  res.send('POST 注册');
});
router.get('/signin',function(req,res){
  res.send('登录');
});
router.post('/signin',function(req,res){
  res.send('POST 登录');
});
router.get('/signout',function(req,res){
  res.send('退出');
});
module.exports = router;