let express = require('express');
let {User} = require('../model');
let router = express.Router();
router.get('/signup',function(req,res){
  //渲染模板 1参数是相对路径
  res.render('user/signup',{title:'用户注册'});
});
//用户注册 1.获取请求体 2. 把这个对象保存到数据库中
router.post('/signup',function(req,res){
  let user = req.body;//先得到请求体对象
  //通过create方法把请求体对象保存到数据库里
  User.create(user,function(err,doc){
    if(err){
      res.redirect('back');//如果注册失败了，跳回注册页
    }else{
      res.redirect('/user/signin');//如果注册成功了，跳到登录页
    }
  });
});
router.get('/signin',function(req,res){
  res.render('user/signin',{title:'用户登录'});
});
router.post('/signin',function(req,res){
  let user = req.body;//{username,password}
  User.findOne(user,function(err,doc){
    if(err){
      res.redirect('back');
    }else{
      if(doc){
        res.redirect('/');
      }else{
        res.redirect('back');
      }
    }
  });
});
router.get('/signout',function(req,res){
  res.send('退出');
});
module.exports = router;