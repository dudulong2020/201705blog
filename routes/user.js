let express = require('express');
let router = express.Router();
router.get('/signup',function(req,res){
  //渲染模板 1参数是相对路径
  res.render('user/signup',{title:'用户注册'});
});
//用户注册 1.获取请求体 2. 把这个对象保存到数据库中
router.post('/signup',function(req,res){
  let user = req.body;

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