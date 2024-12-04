const express = require('express')

const { ValidatorRegister, Validation  } = require('../MiddleWares/Validator')
const { IsAuthorized } = require('../MiddleWares/IsAuthorized')
const { Register, SignIn, currentUser, deleteUser, updateProfile, getAllUsers } = require('../Controllers/User')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const userRouter = express.Router()



userRouter.post('/Register',ValidatorRegister, Validation,Register)



userRouter.post('/SignIn',SignIn)



userRouter.get('/currentUser', IsAuthorized, currentUser)

userRouter.delete('/deleteProfile/:id', deleteUser)


userRouter.put('/UpdateProfil/:id', updateProfile)

userRouter.get('/getAllUsers', getAllUsers)


userRouter.post('/createAdmin', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new admin user
        const adminUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin' // Set role to 'admin'
        });

        await adminUser.save();
        res.status(201).json({ message: 'Admin user created successfully!' });
    } catch (error) {
        console.error('Error creating admin:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
});



module.exports = userRouter