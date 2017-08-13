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
router.get('/detail/:_id',function(req,res){
  let _id = req.params._id;//先得到路径参数
  Article.findById(_id,function(err,article){//根据文章的ID查找文章的对象
      res.render('article/detail',{title:'文章详情',article});
  })
});
router.get('/delete/:_id',function(req,res){
  let _id = req.params._id;
  Article.remove({_id},function(err,result){
    res.redirect('/');
  });
});
router.get('/edit/:_id',function(req,res){
  let _id = req.params._id;
  Article.findById(_id,function(err,article){
    res.render('article/add',{title:'编辑文章',article});
  })
});
module.exports = router;