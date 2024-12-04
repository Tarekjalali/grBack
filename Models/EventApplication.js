const mongoose = require('mongoose')

const EventAppSchema = new mongoose.Schema(
    {
        participant :  {
            type : mongoose.Types.ObjectId,
            ref :'Users'
           } ,
        
        event :{
            type : mongoose.Types.ObjectId,
            ref : 'events'
           },
        status : {
            type : String,
            default : 'Pending'
        }
    }
)

module.exports = mongoose.model('Applications',EventAppSchema)