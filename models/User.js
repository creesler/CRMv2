import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name: { type: String, min: 2, max: 50, required: true },
    link: { type: String, min: 2, max: 50, required: false },
    contractstarted: { type: String, min: 2, max: 50, required: false },
    specialinstruction: { type: String, min: 2, max: 50, required: false },
    colorscheme: { type: String, min: 2, max: 50, required: false },
    tagline: { type: String, min: 2, max: 50, required: false },
    missionstatement: { type: String, min: 2, max: 50, required: false },
    paragraphbusiness: { type: String, min: 2, max: 5550, required: false },
    paragraphyourself: { type: String, min: 2, max: 5550, required: false },
    areas: { type: String, min: 2, max: 50, required: false },
    linkfacebook: { type: String, min: 2, max: 50, required: false },
    linkyoutube: { type: String, min: 2, max: 50, required: false },
    linktwitter: { type: String, min: 2, max: 50, required: false },
    linkinstagram: { type: String, min: 2, max: 50, required: false },
    linkpinterest: { type: String, min: 2, max: 50, required: false },
    linktriller: { type: String, min: 2, max: 50, required: false },
    linksnapchat: { type: String, min: 2, max: 50, required: false },
    linklinkedin: { type: String, min: 2, max: 50, required: false },
    linktiktok: { type: String, min: 2, max: 50, required: false },
    department: { type: String, min: 2, max: 50, required: false },
    jobtitle: { type: String, min: 2, max: 50, required: false },
    datehired: { type: String, min: 2, max: 50, required: false },
    siteshowcase: { type: String, min: 2, max: 50, required: false },
    
    
    companyname: { type: String, min: 2, max: 50, required: false },
    address: { type: String, min: 2, max: 50, required: false },
    phone: { type: String, min: 2, max: 50, required: false },
    email: { type: String, min: 5, max:50, required: true, unique: true, trim:true },
    password: { type: String, required: true },
    photoURL: { type: String, default: '' }, 
    role:{
        type:'String',
        default:'basic',
        enum:['basic', 'editor', 'admin']
    },
    active:{
        type:Boolean, default:true}
},
{timestamps:true}
);

const User = mongoose.model('users', userSchema);
export default User; 