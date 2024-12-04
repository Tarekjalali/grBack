const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const EventApplication = require('../Models/EventApplication')
const Event = require('../Models/Event')


exports.Register =async(req,res)=>{
    
    try {

        const {name,email,password}=req.body
        const found = await User.findOne({email})

        if(found){
            return res.status(400).send({errors : [{msg : 'email already exists'}]})
        }

        const userData = new User(req.body)

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt)

        userData.password=hashedPassword

        userData.save()

        const payload = {id : userData._id}

        var token = jwt.sign(payload, process.env.privateKey);

        res.status(200).send({msg : "account created" , userData , token})





        
    } catch (error) {
        res.status(500).send('can not add user')
    }

}


exports.SignIn = async(req,res)=>{

    try {
            const {email,password}=req.body

            const userData = await User.findOne({email})

            if(!userData){return res.status(400).send({errors : [{msg : 'wrong email password'}]})}

            const matched = bcrypt.compareSync(password, userData.password); 

            if(!matched){
                return res.status(400).send({errors : [{msg : "wrong email password"}]})
            }

            const payload = {id : userData._id}

            var token = jwt.sign(payload, process.env.privateKey);

            res.status(200).send({msg : "welcome" , userData, token})


    } catch (error) {
        res.status(500).send('can not sign in')
    }

}

exports.currentUser = (req,res)=>{ res.send(req.authUser)}

exports.deleteUser = async(req,res)=>{
    try {
        const {id}= req.params

        await Event.deleteMany({owner : id})
        await EventApplication.deleteMany({participant : id})
 




        await User.findByIdAndDelete(id)
        res.status(200).send({msg:'contact deleted'})
    } catch (error) {
        res.status(500).send("could not delete")
    }
}

exports.updateProfile = async(req,res)=>{

    try {
        const {id} = req.params
        
        

        await User.findByIdAndUpdate(id,req.body)

        res.status(200).send({msg: "profile updated"})
    } catch (error) {
        res.status(500).send("could not update")
    }

}

exports.getAllUsers = async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).send({msg:"users list",users})
    } catch (error) {
        res.status(500).send("could not get users.")
    }
}