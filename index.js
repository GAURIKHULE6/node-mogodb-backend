const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const productRoutes = require('./routes/productRoutes');

// Create server & configure
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use('/product',productRoutes);

//connesct atalast

mongoose.connect('mongodb+srv://Gauri:Gauri%40252004@cluster0.lubsgey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').
then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));


server.post('/register',async(req,res)=>{
    try{
        const{fullName,userName,age,password}=req.body
        const userExist=await User.findOne({userName})
        if(userExist){
            return res.json({
                status:false,
                message:'user alredy exists'
            })
        }
        const userObj=new User({fullName,userName,age,password})
         await userObj.save()
         res.json({
            status:true,
            message:'user added Succefully'
         })
    }
    catch (err){
        res.json({
            status:false,
            message:`Error${err}`   
        })
    }
})

server.post('/login',async(req,res)=>{
    try{
        const{userName,password}=req.body
        const userExist=await User.findOne({userName})
        if(!userExist){
            return res.json({
                status:false,
                message:'user not found!!'
            })
        }
        if(password!==userExist.password){
            return res.json({
                status:false,
                message:'wrong password!!'
            })
        }
        res.json({
            status:true ,
            message:'login Succesful'
        })
    }catch (err){
        res.json({
            status:false,
            message:`Error${err}`   
        })
    }
})

// Start server
server.listen(8055, () => {
    console.log('Server is running on port 8055');
});

