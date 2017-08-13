let express = require('express');
let {Article} = require('../model');
//通过调用Router方法生成一个路由中间件实例
let router = express.Router();
//当客户端访问/路径的时候，返回首页
router.get('/',function(req,res){
  let {pageNum,pageSize,keyword} = req.query;
  pageNum = isNaN(pageNum)?1:parseInt(pageNum);//当前页码
  pageSize = isNaN(pageSize)?3:parseInt(pageSize);//每页的条数
  let query = {};//默认空条件
  if(keyword){//如果关键字有值的话
    query = {title:new RegExp(keyword)};
  }
  //查询所有的文章列表
  //populate填充 可以把一个外键字段从ID值变成此ID值对应的文档对象
  Article.count(query,function(err,count){//符合条件的总记录数
    Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
      res.render('index',{
        title:'首页',
        totalPages:Math.ceil(count/pageSize),
        pageNum,
        keyword,
        pageSize,
        articles});
    });
  })
});
//把此路由是中间件导出
module.exports = router;
