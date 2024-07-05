import mongoose from "mongoose";

const YourImage = new mongoose.Schema({
    name:{type:String, required: true},
    prompt:{type:String, required: true},
    photo:{type:String, required: true},
    username:{type:String, required:true},
});



const YourImageSchema = mongoose.model('YourImage', YourImage);


export default YourImageSchema;