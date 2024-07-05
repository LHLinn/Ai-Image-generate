import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import YourImage from '../mongodb/models/yourimage.js';

dotenv.config();
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async(req,res)=>{
    try {
        const { username } = req.query;
        const posts = await YourImage.find({username});

        res.status(200).json({success:true, data: posts});
    } catch (error) {
        res.status(500).json({success: false, message: `could not get post ${error}`});
        
    }
})



router.route('/').post(async(req,res)=>{
    try {
        const { name, prompt, photo, username} = req.body;
        const photoURL = await cloudinary.uploader.upload(photo);
        const newImage = await YourImage.create({
            name,
            prompt,
            photo: photoURL.url,
            username,
        })
        res.status(201).json({success:true, data:newImage});
    } catch (error) {
        res.status(500).json({success:false, message: `could not upload photo ${error}`});
        
    }
})

export default router;