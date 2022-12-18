const express=require("express")
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const port=process.env.PORT
const cors = require('cors')

const connectToMongo=require('./db')
connectToMongo();
app.use(cors())

app.use(express.json())

app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`Server is listening on  port ${port}`)
})