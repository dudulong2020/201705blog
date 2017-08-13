//引入express模块
let express = require('express');
let session = require('express-session');
let Mongodb = require('connect-mongo')(session);
//这是一个消息中间件,此中间件负责向session中读写消息
let flash = require('connect-flash');
//首页的路由中间件
let index = require('./routes/index');
//用户的路由中间件
let user = require('./routes/user');
let article = require('./routes/article');
let path = require('path');
let bodyParser = require('body-parser');
//执行express方法得到app函数
let app = express();
//使用bodyparser中间件，得到请求体 req.body
app.use(bodyParser.urlencoded({extended:true}));
//设置模板引擎
app.set('view engine','html');
//设置模板的存放路径
app.set('views',path.resolve('views'));
//设置html模板的渲染方法
app.engine('html',require('ejs').__express);
//参数是静态文件根目录,当客户端访问服务器的静态文件的时候，此中间件会去静态文件根目录下找这个文件，如果找到则返回客户端，找不到则next
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('upload')));
//使用session中间件,在请求对象上增加一个req.session属性
//req.session是当前客户端在服务器对应的会话对象
//req.session
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:'zfpx',
  store:new Mongodb({//指定session的存放位置
    url:'mongodb://127.0.0.1/201705blog'
  })
}));
//使用了此中间件之后，
// req.flash(type,msg) 写入一个消息  req.flash(type); 读一个消息,并且销毁消息，这表示写入的消息只能读取一个
app.use(flash());
//此中间件来用来给模板的公共变量赋值
app.use(function(req,res,next){
 //把session中的user属性取出赋给模板
 res.locals.user = req.session.user;
 //req.flash('success')取出来的是一个数组.对象不能在模板里直接渲染，需要转成字符串 res.locals是用来渲染模板的数据对象
 res.locals.success = req.flash('success').toString();
 res.locals.error = req.flash('error').toString();
 res.locals.keyword = '';
 next();
});
//如果说请求的URL路径是以/开头的，交给index路由中间件处理
app.use('/',index);
//如果说请求的URL路径是以/user开头的，交给user路由中间件处理
app.use('/user',user);
app.use('/article',article);
//监听8080端口，启动http服务器
app.listen(8080);
