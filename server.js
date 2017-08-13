//引入express模块
let express = require('express');
//首页的路由中间件
let index = require('./routes/index');
//用户的路由中间件
let user = require('./routes/user');
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
//如果说请求的URL路径是以/开头的，交给index路由中间件处理
app.use('/',index);
//如果说请求的URL路径是以/user开头的，交给user路由中间件处理
app.use('/user',user);
//监听8080端口，启动http服务器
app.listen(8080);
