//1.引入mongoose
let mongoose = require('mongoose');
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
