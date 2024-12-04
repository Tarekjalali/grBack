const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic : {type : String , default : "https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU="},
    coverPhoto : {type : String , default :'https://wallpapercave.com/wp/wp3173690.jpg'},
    bio : {type : String , default : "test"},
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
});


module.exports = mongoose.model('Users', User);