import express from 'express'
import mongoose ,{ Schema,model } from 'mongoose';
import Dotenv from 'dotenv'
Dotenv.config()
 


const app=express();
app.use(express.json())
const PORT =5000


const storedData= async ()=>{
  const data= await mongoose.connect(process.env.MONGO_URI)
  if(data){
    console.log("Connect To MongoDB")
  }
}
storedData()

const studentSchema=new Schema({
  name:String,
  age:Number,
  mobile:String,
  email:String
})
const students=model('students',studentSchema)

app.get('/students',async (req,res)=>{
  const list= await students.find()
    res.json({
        status:'ok',
        data:list,
        massage:'Student featch successfully'
    })
})


 app.post('/student',async (req,res)=>{
    const {name,age,mobile,email}=req.body
      if(!name){
        return res.json({
          status:'error',
          message:"please provide name"
        })
      }
      if(!age){
        return res.json({
          status:'error',
          message:"please provide age"
        })
      }
      if(!mobile){
        return res.json({
          status:'error',
          message:"please provide mobile number"
        })
      }
     const saveStudent= new students({
      name:name,
      age:age,
      mobile:mobile,
      email:email
     })
     const savelist=await saveStudent.save()

    res.json({
        status:'ok',
       list:savelist,
        massage:'Data Add successfully'
    })
 })

 app.get('/student',async (req,res)=>{
  const {name} = req.query;
  const getOne= await students.findOne({name:name}) 
  if(getOne==null){
    return res.json({
      status:'error',
      message:`${name} not found`
    })
  }
  res.json({
    status:'ok',
    data:getOne,
    massage:'Data fetched Successfully'
  })
 })
app.listen(PORT,()=>{
    console.log(`Run on PORT ${PORT}`)
})