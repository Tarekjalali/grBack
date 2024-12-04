const mongoose  = require ('mongoose')

const eventSchema = new mongoose.Schema(
    {
        Game : {type : String , required : true},
        Description : {type : String , required : true},
        Location : {type : String , required : true},
        Date : {type : Date , required : true},
        eventPic : {type : String , default : "https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg"},
        owner : {
            type : mongoose.Types.ObjectId,
            ref : "Users"
        }
    }
)

module.exports  = mongoose.model('events', eventSchema)