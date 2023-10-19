import express from 'express'


const app=express();
app.use(express.json())
const PORT =5000

const student=[]

app.get('/students',(req,res)=>{
    res.json({
        status:'ok',
        data:student,
        massage:'Student featch successfully'
    })
})


 app.post('/student',(req,res)=>{
    const {name,age,mobile,email}=req.body
      const id=Math.floor(Math.random()*100000)
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
      const obj={
        id:id,
        name:name,
        age:age,
        mobile:mobile,
        email
      }

      student.push(obj)

    res.json({
        status:'ok',
        list:obj,
        massage:'Data Add successfully'
    })
 })

 app.get('/student',(req,res)=>{
  const {name} = req.query;
  let result;
  student.forEach((obj)=>{
    if(obj.name===name){
      result=obj;
    }
  })
  res.json({
    status:'ok',
    data:result,
    massage:'Data fetched Successfully'
  })
 })
app.listen(PORT,()=>{
    console.log(`Run on PORT ${PORT}`)
})