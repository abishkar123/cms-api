import express from 'express'
import clientPromise from '../config/dbConfig.js'
import mongoose from 'mongoose'



const router = express.Router()

let db
let client
let orders


async function init(){
    if(db) return
    try {
        client = await clientPromise
        db = await client.db()
        orders = await db.collection('orders')
        db && console.log('Mongo db connected!')
    } catch (error) {
        throw new Error('Failed to connect to db')
    }
}



router.get('/', async(req,res,next) => {
   await init()
   try {

    const order = await orders.find({}).toArray()
   
  
    res.json({
        status: "success",
        message: "get the list of order ",
        order,
      });
     
    
   } catch (error) {
    next(error)
   }
})

router.delete("/:_id", async(req,res,next) => {
    await init()
    try {
        const {_id} = req.params
        console.log(req.params)

 
     const result = await orders.deleteOne({_id:mongoose.Types.ObjectId(_id)})

     console.log(result)


     if(result?.deletedCount){
        return res.json({
            status: "success",
            message: "successfully delete Order",
        
        })
    }


        res.json({
            status:"error",
            message:"unable to delete the order"
        })

     
    } catch (error) {
     next(error)
    }
 })

export default router