let express = require('express');
//通过调用Router方法生成一个路由中间件实例
let router = express.Router();
//当客户端访问/路径的时候，返回首页
router.get('/',function(req,res){
  res.send('首页');
});
//把此路由是中间件导出
module.exports = router;
