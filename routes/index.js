let express = require('express');
let {Article} = require('../model');
//通过调用Router方法生成一个路由中间件实例
let router = express.Router();
//当客户端访问/路径的时候，返回首页
router.get('/',function(req,res){
  //查询所有的文章列表
  //populate填充 可以把一个外键字段从ID值变成此ID值对应的文档对象
  Article.find({}).populate('user').exec(function(err,articles){
    res.render('index',{title:'首页',articles});
  });
});
//把此路由是中间件导出
module.exports = router;
