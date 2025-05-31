import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    isFeature:{
        type: Boolean,
        default: false
    },
    isTopSelling:{
        type: Boolean,
        default:false
    },
    image:{
        type: String
    },
    image_id:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

const PizzaModel = mongoose.models.pizza || mongoose.model('pizza', Schema)

export default PizzaModel;