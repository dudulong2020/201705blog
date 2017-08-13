# 初始化项目
```
npm init -y
```

# 安装依赖的模块
```
npm install express mongoose body-parser express-session connect-mongo connect-flash multer debug ejs bootstrap -S
```

# 划分模块
- 用户管理
- 文章分类管理
- 文章管理

# 编写路由
路由是项目的骨架，是项目的核心
## 首页路由
|路由名称|请求方式|路由路径|
|:----|:----|:----|
|显示首页|GET|/|

## 用户路由
|路由名称|请求方式|路由路径|
|:----|:----|:----|
|获取用户注册表单|GET|/user/signup|
|提交用户注册表单|POST|/user/signup|
|获取用户登录表单|GET|/user/signin|
|提交用户登录表单|POST|/user/signin|
|用户退出|GET|/user/signout|



