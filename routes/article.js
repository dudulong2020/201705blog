let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/add',function(req,res){
  res.render('article/add',{title:'发表文章'});
});
router.post('/add',function(req,res){
  let article = req.body;
  //给user赋值
  article.user = req.session.user._id;
  Article.create(article,function(err,doc){
     if(err){
       req.flash('error',err.toString());
       res.redirect('back');
     }else{
       req.flash('success','发表文章成功!');
       res.redirect('/');
     }
  })
});
module.exports = router;