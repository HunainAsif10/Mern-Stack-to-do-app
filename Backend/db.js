const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const URL=process.env.MONGO_URL

const connectToMongo=()=>{
    mongoose.connect(URL,()=>{
        console.log("DataBase Connected")
    })
}
module.exports=connectToMongo;