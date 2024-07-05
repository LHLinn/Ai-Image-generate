import express from 'express';
import Credential from '../mongodb/models/credential.js'

const router = express.Router();


router.route('/register').post(async(req,res)=>{
    try {
        const { username, password } = req.body;
       
        
        const user = await Credential.findOne({ username });
        if (!user) {
            const newUser = new Credential({ username, password });
            await newUser.save();
            res.status(201).json({success: true, message: 'User registered successfully' });
        }
        else{
            res.status(409).json({message:'User already exist'});
            
        }
    } catch (error) {
        res.status(500).json({success: false, message: error });
        
    }
})

router.route('/login').post(async(req,res)=>{
    try {
        const { username, password } =req.body;
        const user = await Credential.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

export default router;