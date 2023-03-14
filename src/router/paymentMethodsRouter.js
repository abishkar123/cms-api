import express from 'express'
import { updatepaymentmethodValidation } from '../middlewares/joimiddleware.js';
import { createNewpaymentMethod, deletepaymentMModel, readpaymentMethod, updatepaymentMModel } from '../model/paymetMethods/PaymetMModel.js';
const router = express.Router()

//create paymentMethod
router.post("/", async (req, res, next)=>{
    try{
        const{name, description} = req.body;
 
        const result = await createNewpaymentMethod(req.body)
        console.log(result)
       
        if (result?._id) {
            return  res.json({
                status: "success",
                message: " Successfully register the payment Methods.",
             
            })
            
        }

        res.json({
            status:"error",
            message:"cannot create new payment method"
        })

       

    }catch(error){
        next(error)
    }
})

//Read paymentMethod
router.get("/", async (req, res, next)=>{
    try{

        const result = await readpaymentMethod()
   
        res.json({
            status: "success",
            message: "Here is the payment method",
            result,
        })

    }catch(error){
        next(error)
    }
})
//Delete paymentMethod
router.delete("/:_id?",async (req, res, next)=>{
    try{
        const {_id} = req.params
        const result = await deletepaymentMModel(_id)
    

        if(result?._id){
            return res.json({
                status: "success",
                message: "successfully delete payment method",
            })
        }

    
            res.json({
                status:"error",
                message:"unable to delete the payment method"
            })
    
        

    }catch(error){
        next(error)
    }
})

//Update PaymentMethod
router.put("/", updatepaymentmethodValidation, async(req, res, next )=>{
    try{
        
        const result = await updatepaymentMModel(req.body);


        if (result?._id) {
            return res.json({
              status: "success",
              message: "The Payment Method has been updated!",
              result,
            });
          }
          res.json({
            status: "error",
            message: "Unanble to update payment , please try gain later",
          });

    }catch(error){
        next(error);
    }
})
export default router;