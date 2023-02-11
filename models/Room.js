import mongoose from 'mongoose';


const roomSchema = mongoose.Schema({
    lng:{type:Number, required:false},
    lat:{type:Number, required:false},
    price:{type:Number, min:0, max:50, default:0},
    // title:{type:String, required:false, minLength:5, maxLength:150},
    task:{type:String, required:true, minLength:5, maxLength:150},
    client:{type:String, required:true, minLength:5, maxLength:150},
    employee:{type:String, required:true, minLength:5, maxLength:150},
    status:{type:String, required:true, minLength:1, maxLength:150},
    deadline:{type:String, required:true, minLength:1, maxLength:150},
    description:{type:String, required:true, minLength:10, maxLength:1000},
    images:{type:[String], 
        // validate:(v)=> Array.isArray(v)&& v.length>0
    },
    uid:{type:String, required:true},
    uName:{type:String, required:true},
    uPhoto:{type:String, default:''},
},
{timestamps:true}
)

const Room = mongoose.model('rooms', roomSchema)

export default Room