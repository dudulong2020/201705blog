let express = require('express');
let {Article} = require('../model');
//通过调用Router方法生成一个路由中间件实例
let router = express.Router();
//当客户端访问/路径的时候，返回首页
router.post('/add',function(req,res){
 let comment = req.body;
 comment.user = req.session.user._id;
 let {articleId} = req.query;
 Article.update({_id:articleId},{$push:{comments:comment}},function(err,result){
   res.redirect(`/article/detail/${articleId}`);
 });
});
//把此路由是中间件导出
module.exports = router;
