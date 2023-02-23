import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import tryCatch from "./utils/tryCatch.js";
import Room from '../models/Room.js'


export const register = tryCatch(async (req, res)=>{
    
        const {
            name, 
            email, 
            password, 
            link, 
            companyname,
            address,
            phone,
            contractstarted,
            specialinstruction,
            colorscheme,
            tagline,
            missionstatement,
            paragraphbusiness,
            paragraphyourself,
            areas,
            linkfacebook,
            linkyoutube,
            linktwitter,
            linkinstagram,
            linkpinterest,
            linktriller,
            linksnapchat,
            linklinkedin,
            linktiktok,
            department,
            jobtitle,
            datehired,
            siteshowcase,
        } = req.body
        if(password.length < 6) return res.status(400).json({success:false, message:'Password must be 6 characters or more'})
        const emailLowerCase = email.toLowerCase()
        const existedUser = await User.findOne({email:emailLowerCase})
        if(existedUser) return res.status(400).json({success:false, message:'User already exists!'})
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            name,
            email:emailLowerCase,
            password:hashedPassword,
            link,
            companyname,
            address,
            phone,
            contractstarted,
            specialinstruction,
            colorscheme,
            tagline,
            missionstatement,
            paragraphbusiness,
            paragraphyourself,
            areas,
            linkfacebook,
            linkyoutube,
            linktwitter,
            linkinstagram,
            linkpinterest,
            linktriller,
            linksnapchat,
            linklinkedin,
            linktiktok,
            department,
            jobtitle,
            datehired,
            siteshowcase,
        }) 
        const {_id: id, photoURL, role, active } = user
        const token = jwt.sign({id, name, photoURL, role}, process.env.JWT_SECRET, {expiresIn:'1h'})
        res.status(201).json({
            success:true, 
            result:{
                id, 
                name, 
                email:user.email, 
                photoURL, 
                token, 
                role, 
                active, 
                link,
                companyname,
                address,
                phone,
                contractstarted,
                specialinstruction,
                colorscheme,
                tagline,
                missionstatement,
                paragraphbusiness,
                paragraphyourself,
                areas,
                linkfacebook,
                linkyoutube,
                linktwitter,
                linkinstagram,
                linkpinterest,
                linktriller,
                linksnapchat,
                linklinkedin,
                linktiktok,
                department,
                jobtitle,
                datehired,
                siteshowcase,
            },
        }); 
});


export const login = tryCatch(async(req, res)=>{
    const {email, password} = req.body
    
        const emailLowerCase = email.toLowerCase()
        const existedUser = await User.findOne({email:emailLowerCase})
        if(!existedUser) return res.status(404).json({success:false, message:'User does not exist!'})
        const correctPassword = await bcrypt.compare(password, existedUser.password);
        if(!correctPassword) return res.status(400).json({success:false, message:'Invalid credentials'})
        
        const {
            _id:id,
            name, 
            photoURL, 
            role, 
            active, 
            link,
            companyname,
            address,
            phone,
            contractstarted,
            specialinstruction,
            colorscheme,
            tagline,
            missionstatement,
            paragraphbusiness,
            paragraphyourself,
            areas,
            linkfacebook,
            linkyoutube,
            linktwitter,
            linkinstagram,
            linkpinterest,
            linktriller,
            linksnapchat,
            linklinkedin,
            linktiktok,
            department,
            jobtitle,
            datehired,
            siteshowcase,
        } = existedUser;
        if(!active) return res.status(400).json({success:false, message:'This account has been suspended! Try to contact the Admin'})
        const token = jwt.sign({id, name, photoURL, role}, process.env.JWT_SECRET, {expiresIn:'1h'})
        res.status(200).json({
            success:true, 
            result:{
                id, 
                name, 
                email: emailLowerCase, 
                photoURL, 
                token, 
                role, 
                active, 
                link,
                companyname,
                address,
                phone,
                contractstarted,
                specialinstruction,
                colorscheme,
                tagline,
                missionstatement,
                paragraphbusiness,
                paragraphyourself,
                areas,
                linkfacebook,
                linkyoutube,
                linktwitter,
                linkinstagram,
                linkpinterest,
                linktriller,
                linksnapchat,
                linklinkedin,
                linktiktok,
                department,
                jobtitle,
                datehired,
                siteshowcase,
            },
        }); 
})

export const updateProfile = tryCatch(async(req, res)=>{
    const fields = req.body?.photoURL ? {
        name:req.body.name, 
        photoURL:req.body.photoURL, 
        link:req.body.link,
        companyname:req.body.companyname,
        address:req.body.address,
        phone:req.body.phone,
        contractstarted:req.body.contractstarted,
        specialinstruction:req.body.specialinstruction,
        colorsheme:req.body.colorscheme,
        tagline:req.body.tagline,
        missionstatement:req.body.missionstatement,
        paragraphbusiness:req.body.paragraphbusiness,
        paragraphyourself:req.body.paragraphyourself,
        areas:req.body.areas,
        linkfacebook:req.body.linkfacebook,
        linkyoutube:req.body.linkyoutube,
        linktwitter:req.body.linktwitter,
        linkinstagram:req.body.linkinstagram,
        linkpinterest:req.body.linkpinterest,
        linktriller:req.body.linktriller,
        linksnapchat:req.body.linksnapchat,
        linklinkedin:req.body.linklinkedin,
        linktiktok:req.body.linktiktok,
        department:req.body.department,
        jobtitle:req.body.jobtitle,
        datehired:req.body.datehired,
        siteshowcase:req.body.siteshowcase,
    } : {name:req.body.name}
    const updatedUser = await User.findByIdAndUpdate(req.user.id, fields, {new:true})
    const {_id:id, name, photoURL, role} = updatedUser

    await Room.updateMany({uid:id}, {uName:name, uPhoto:photoURL})
    
    const token = jwt.sign({id, name, photoURL, role}, process.env.JWT_SECRET, {
        expiresIn:'1h',
    });
    res.status(200).json({success:true, result:{name, photoURL, token},
    });
});



//////////////////////////////////////////////////////////////////////////////////////////
// TEST CODE ONLY
export const updateProfilee = tryCatch(async(req, res)=>{
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {new:true})
    const {_id:id, name, photoURL} = updatedUser

    // To do: update all the rooms records added by this user

    const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(200).json({success:true, result:{name, photoURL, token}});
});
//////////////////////////////////////////////////////////////////////////////////////////





export const getUsers = tryCatch(async (req, res)=>{
    const users = await User.find().sort({_id:-1})
    res.status(200).json({success:true, result:users});
});

export const updateStatus =  tryCatch(async(req, res)=>{
    const {
        role, 
        active, 
        link,
        companyname,
        address,
        phone,
        contractstarted,
        specialinstruction,
        colorscheme,
        tagline,
        missionstatement,
        paragraphbusiness,
        paragraphyourself,
        areas,
        linkfacebook,
        linkyoutube,
        linktwitter,
        linkinstagram,
        linkpinterest,
        linktriller,
        linksnapchat,
        linklinkedin,
        linktiktok,
        department,
        jobtitle,
        datehired,
        siteshowcase,
    } = req.body
    await User.findByIdAndUpdate(req.params.userId, {
        role, 
        active, 
        link,
        companyname,
        address,
        phone,
        contractstarted,
        specialinstruction,
        colorscheme,
        tagline,
        missionstatement,
        paragraphbusiness,
        paragraphyourself,
        areas,
        linkfacebook,
        linkyoutube,
        linktwitter,
        linkinstagram,
        linkpinterest,
        linktriller,
        linksnapchat,
        linklinkedin,
        linktiktok,
        department,
        jobtitle,
        datehired,
        siteshowcase,
    })
    res.status(200).json({success:true, result:{_id:req.params.userId}})
})