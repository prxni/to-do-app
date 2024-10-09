const express = require('express')
const app = express()
const cors=require('cors')
app.use(express.json())
app.use(cors())
const mongoose = require('mongoose')
const Dialogue = require('./models/dialogue')

app.listen(3000,()=>
    {
        console.log("Listening at 3000")
    })

mongoose.set('strictQuery',true)
mongoose.connect("mongodb://127.0.0.1:27017/hehe")
.then(()=>console.log("Connection Susessfull!"))

app.post('/api/create',(req,res)=>{
    if(!req.body.heading)
        return res.status(400).json({message:"Need Heading!"})
    if(!req.body.text)
        return res.status(400).json({message:"Need Text!"})

    const dialogue = new Dialogue({heading:req.body.heading,text:req.body.text,status:req.body.status})
    dialogue.save()
    .then(result => res.status(201).json(result))
})

app.post('/api/switch/:id',async(req,res)=>{
    let dialogue=await Dialogue.findById(req.params.id)
    dialogue.status=req.body.status
    dialogue.save()
    .then(result=>res.status(200).json(result))
})

app.get('/api',(req,res)=>{
    const dialogues=Dialogue.find()
    .then(result=>res.status(200).json(result))
})