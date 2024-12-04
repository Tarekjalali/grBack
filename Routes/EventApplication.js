const express = require('express');
const EventApplication = require('../Models/EventApplication');

const appRouter = express.Router()


appRouter.post('/applyToEvent', async (req, res) => {
    
    try {

      // const { participant, event } = req.body;
      const found = await EventApplication.findOne(req.body)

      if (found) {
        return res.status(400).send("yezzik")
      }
      
      const application = new EventApplication(req.body);
      await application.save();
      res.status(200).send(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to apply for event' });
    }
  })

  appRouter.get('/getAllApplications', async(req,res)=>{

    try {
      const applications = await EventApplication.find().populate('event').populate('participant')
      res.status(200).send({msg : "applications" , applications})
      
    } catch (error) {
      res.status(500).send('could not get applications')
    }

  })

  appRouter.delete('/deleteApplication/:id', async(req,res)=>{
    try {
      const {id} = req.params
      await EventApplication.findByIdAndDelete(id)
      res.status(200).send('application deleted')
    } catch (error) {
      res.status(500).send('could not delete application')
    }
  })

  appRouter.get('/getMyApplications/:id',async(req,res)=>{

    try {
        const {id} = req.params
        const myApps = await EventApplication.find({participant: id}).populate('event').populate('participant')
        res.status(200).send(myApps)
      
    } catch (error) {
      res.status(500).send('can not get apps')
    }

  })

  appRouter.get('/getParticpantsList/:id',async(req,res)=>{

    try {
      const {id} = req.params
console.log(id)
      const participants = await EventApplication.find({event : id}).populate('event').populate('participant')

      res.status(200).send(participants)
      
    } catch (error) {
      res.status(500).send('could not get participants list')
    }

  })


  appRouter.put('/UpdateApplicationStatus/:id',async(req,res)=>{

    try {
      const {id} = req.params

      await EventApplication.findByIdAndUpdate(id,req.body)

      res.status(200).send('application updated')
    } catch (error) {
      res.status(500).send('could not update application')
    }

  })


module.exports = appRouter