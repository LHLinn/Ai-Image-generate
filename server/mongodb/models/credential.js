import mongoose from "mongoose";


const Credential = new mongoose.Schema({
    username:{type:String, requuired: true},
    password:{type:String, required: true},
})

const CredentialSchema = mongoose.model('Credential', Credential);

export default CredentialSchema;