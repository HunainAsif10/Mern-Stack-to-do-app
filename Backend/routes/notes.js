const express=require('express')
const router=express.Router()
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');
const { fetchUser } = require('../middleware/fetchUser');



// createNotes
router.post('/createNote',fetchUser,[
    body('title','Name Must be 3 Characters').isLength({min:3}),
    body('description','Enter A Valid Email').isLength({min:5}),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let note=await Notes(req.body);
      let savedNote=await note.save();
      res.status(200).json({savedNote})
        
    } catch (error) {
        res.status(500).json("Internal Server Error")
        
    }

})

// updateNotes
router.put('/updateNotes/:id',fetchUser,async(req,res)=>{
    const updatedNote=await Notes.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

res.status(200).json({updatedNote})
})

// deleteNotes
router.delete('/deleteNotes/:id',fetchUser,async(req,res)=>{
    const deletedNote=await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({deletedNote})
})

// getNotes

router.get('/getNotes',fetchUser,async(req,res)=>{
    const notes=await Notes.find()
    res.status(200).json({notes})
})
module.exports=router;