import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    oauth_id:{
        type:String,
    },
    name: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    role:{
        type: String,
        default: "user"
    },
    image:{
        type: String
    },
    password: {
        type: String,
        // required: true,
        select: false
    },
    provider:{
        type: String
    }
},{
    timestamps: true
}
);

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

export default UserModel;
