
import Project from '../models/Project.js'
import tryCatch from './utils/tryCatch.js'


export const createProject = tryCatch( async (req, res) =>{
    const {id:uid, name:uName, photoURL:uPhoto} = req.user
    const newProject = new Project({...req.body, uid, uName, uPhoto})
    await newProject.save()
    res.status(201).json({success:true, result:newProject})
})