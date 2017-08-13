let express = require('express');
let {User} = require('../model');
//此中间件仅仅是用来处理上传文件的表单的
let multer = require('multer');
//执行multer方法，并传入配置对象，配置上传后的文件存放的路径
//代表当前目录，当前目录是server.js所在的目录,也就是启动服务器的文件所在的目录
let upload = multer({dest:'./upload'});
let router = express.Router();
router.get('/signup',function(req,res){
  //渲染模板 1参数是相对路径
  res.render('user/signup',{title:'用户注册'});
});
//用户注册 1.获取请求体 2. 把这个对象保存到数据库中
//upload.single是用来生成一个中间件函数，负责解析请求体，解析完成后会得到二个对象 req.body存放着所有的文件类型的字段，一个叫req.file 存放着上传后的文件信息
router.post('/signup',upload.single('avatar'),function(req,res){
  let user = req.body;//先得到请求体对象
  //   /6ed1f5e1aa76bcbf24b1f067c5cce71e
  //这个路径其实是upload目录的子路径，只需要把upload目录作为静态文件根目录，就可以通过 /文件名返回这个文件的内容
  user.avatar = `/${req.file.filename}`;
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
          req.flash('success','用户注册成功，请登录!');
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
      req.flash('error',err.toString());
      res.redirect('back');
    }else{
      if(doc){
        req.flash('success','恭喜你登录成功!');
        //把登录成功之后的用户对象写入会话中
        req.session.user = doc;
        res.redirect('/');
      }else{
        req.flash('error','用户名或密码输入错误，请重新输入');
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

/**
 * { fieldname: 'avatar',字段名
     originalname: '1.jpg',原始的文件名
     encoding: '7bit',
     mimetype: 'image/jpeg',文件MIME类型 大类型/小类型
     destination: './upload',上传的路径
     filename: '6ed1f5e1aa76bcbf24b1f067c5cce71e',//上传之后保存到服务器硬盘上的文件名
     path: 'upload\\6ed1f5e1aa76bcbf24b1f067c5cce71e',//路径
     size: 51514 文件的大小
     }
 **/