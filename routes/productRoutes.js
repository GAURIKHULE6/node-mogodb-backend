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

router.delete('/delete/:id',async(req,res)=>{
    //findByIdAndDelete
    try{
        const id=req.params.id
        await Product.findByIdAndDelete(id)
        res.json({
            status:true,
            message:'Product deleted Succefully'
        })
    }catch (err){
        res.json({
            status:false,
            message:`Error${err}`   
        })
    }
})

router.put('/update/:id',async(req,res)=>{
    //findByIdAndUpdate
    try{
        const id=req.params.id
        const update=await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.json({
            status:true,
            message:'Product Updated Succefully'
        })

    }catch (err){
        res.json({
            status:false,
            message:`Error${err}`   
        })
    }

})
module.exports=router