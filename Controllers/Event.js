const Event = require('../Models/Event')

exports.createEvent = async(req,res)=>{

    try {

        const newEvent = new Event(req.body)
        await  newEvent.save()
        res.status(200).send({msg : "event created" , newEvent})
        
    } catch (error) {
        res.status(500).send('could not create event')
    }

}

exports.getAllEvents = async(req,res)=>{

    try {
        const events = await Event.find().populate('owner')

        res.status(200).send({msg : "events" , events})
    } catch (error) {
        res.status(500).send('could not get events')
    }

}

exports.getOneEvent = async(req,res)=>{

    try {
        const {id} = req.params

        const event = await Event.findById(id)

        res.status(200).send(event)
        
    } catch (error) {
        res.status(500).send('could not get this event')
    }

}

exports.deleteEvent = async(req,res)=>{
    try {
        const {id} = req.params
        await Event.findByIdAndDelete(id)
        res.status(200).send('event deleted')
    } catch (error) {
        res.status(500).send('could not deleted event')
    }
}

exports.updateEvent = async(req,res)=>{
    try {
        const {id} = req.params
        const event = await Event.findByIdAndUpdate(id,req.body)
        res.status(200).send({msg : "event updated",event})
    } catch (error) {
        res.status(500).send('could not update event')
    }
}