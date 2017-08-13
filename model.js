//1.引入mongoose
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
//2.连接数据库 conn是返回的连接对象
let conn = mongoose.createConnection('mongodb://127.0.0.1/201705blog');
//3. 定义Schema用户的骨架模型
let UserSchema = new mongoose.Schema({
  username:String, //用户名
  password:String, //密码
  email:String,    //邮件
  avatar:String    //增加一个头像的字段
});
//4.定义模型并导出模型
exports.User = conn.model('User',UserSchema);
//每个集合都有_id,这个_id是此集合的主键，最主要的键，是此文件的唯一标识
//_id的类型就是ObjectId
let ArticleSchema = new mongoose.Schema({
  title:String,
  content:String,
  createAt:{type:Date,default:Date.now},
  //表示作者，对应一个用户, ref的是当前的外键引用的是哪个集合的主键 ，把那个集合的模型名称放在此即可，大小写也要对应上
  user:{type:ObjectId,ref:'User'}
})
exports.Article = conn.model('Article',ArticleSchema);
