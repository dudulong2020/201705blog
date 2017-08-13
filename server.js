//引入express模块
let express = require('express');
//首页的路由中间件
let index = require('./routes/index');
//用户的路由中间件
let user = require('./routes/user');
//执行express方法得到app函数
let app = express();
//如果说请求的URL路径是以/开头的，交给index路由中间件处理
app.use('/',index);
//如果说请求的URL路径是以/user开头的，交给user路由中间件处理
app.use('/user',user);
//监听8080端口，启动http服务器
app.listen(8080);
