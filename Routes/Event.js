const express = require('express')
const { createEvent, getAllEvents, getOneEvent, deleteEvent, updateEvent } = require('../Controllers/Event')
const Event = require('../Models/Event')

const eventRouter = express.Router()


eventRouter.post('/createEvent', createEvent)

eventRouter.get('/getAllEvents', getAllEvents)

eventRouter.get('/getOneEvent/:id', getOneEvent)

eventRouter.get('/getMyEvents/:id',async(req,res)=>{

    try {
        const {id} = req.params
        const myEvents = await Event.find({ owner : id})
        res.status(200).send(myEvents)
        
    } catch (error) {
        res.status(500).send('can not get events')
    }

})

eventRouter.delete('/deleteEvent/:id',deleteEvent)

eventRouter.put('/updateEvent/:id',updateEvent)





module.exports = eventRouter