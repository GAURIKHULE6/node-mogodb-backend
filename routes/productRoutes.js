const express= require('express')
const Product=require('../models/Product')
const router=express.Router()


router.post('/add',async(req ,res)=>{
    try{
        const{productName,productPrice,productUnit,productDescription}=req.body
        const productExist=await Product.findOne({productName})
        if(productExist){
            return res.json({
                status:false,
                message:'Product alredy exist'
            })
        }
        const productObj=new Product({productName,productPrice,productUnit,productDescription})
        await productObj.save()
        res.json({
            status:true,
            message:'Product added Succefully'
        })

    }catch (err){
        res.json({
            status:false,
            message:`Error${err}`   
        })
    }
})
router.get('/get',async(req,res)=>{
    try{
        const result=await Product.find()
        res.json({
            status:true,
            message:result
        })

    }catch (err){
        res.json({
            status:false,
            message:`Error${err}`   
        })
    }
})

module.exports=router