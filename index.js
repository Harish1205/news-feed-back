const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users.js')
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://Harishhhh:Harishh123@harishh.tz7s75q.mongodb.net/News?retryWrites=true&w=majority')
.then(()=>{console.log('Connected to Atlas')})
.catch((err)=>{console.log(err)})

app.post("/register",(req,res)=>{
    UserModel.create(req.body)
    .then(e => res.json(e))
    .catch((err)=> res.json(err))
})

app.post("/userLogin", (req,res) => {

    const {mail,password}=req.body;
    UserModel.findOne({mail: mail})
    .then(user => {

        if(user){
            if(user.password === password) {
                res.json("Success")
            }
            else{
                res.json("password not correct")
            }
        }else{
            res.json("Account Not Found")
        }

    })


})

// app.post("/adminLogin", (req,res) => {

//     const {mail,password}=req.body;
//     AdminModel.findOne({mail: mail})
//     .then(user => {

//         if(user){
//             if(user.password === password) {
//                 res.json("Success")
//             }
//             else{
//                 res.json("password not correct")
//             }
//         }else{
//             res.json("Account Not Found")
//         }

//     })


// })

app.listen(3001, ()=> {
    console.log('Server is running');
})