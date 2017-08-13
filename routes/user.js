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
  User.findOne({username:user.username},function(err,oldUser){
    if(oldUser){//如果找到了跟这次保存的用户名相同的用户，那就是有同名的用户
      req.flash('error','此用户名已存在，请重新输入');
      res.redirect('back');
    }else{
      User.create(user,function(err,doc){
        if(err){
          req.flash('error',err.toString());
          res.redirect('back');//如果注册失败了，跳回注册页
        }else{
          req.flash('success','用户注册成功，请登录1!');
          req.flash('success','用户注册成功，请登录2!');
          res.redirect('/user/signin');//如果注册成功了，跳到登录页
        }
      });
    }
  });

});
router.get('/signin',function(req,res){
  res.render('user/signin',{title:'用户登录'});
});
router.post('/signin',function(req,res){
  let user = req.body;//{username,password}得到请求体
  //查询数据库里有没有跟这个用户用户名和密码相同的用户
  User.findOne(user,function(err,doc){
    if(err){
      res.redirect('back');
    }else{
      if(doc){
        //把登录成功之后的用户对象写入会话中
        req.session.user = doc;
        res.redirect('/');
      }else{
        res.redirect('back');
      }
    }
  });
});
router.get('/signout',function(req,res){
  //把会话对象中的user属性置为null即意味着退出
  req.session.user = null;
  res.redirect('/user/signin');
});
module.exports = router;