const mongoose = require('mongoose')

const participationSchema = new mongoose.Schema(
    {
       event : {
        type : mongoose.Types.ObjectId,
        ref : 'events'
       },
       owner : {
        type : mongoose.Types.ObjectId,
        ref :'Users'
       } 
        
    }
)

module.exports = mongoose.model('Partitipation',participationSchema)