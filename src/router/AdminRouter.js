import express from 'express'
import { newAdminValidation } from '../middlewares/joimiddleware.js';
import { createNewAdmin } from '../model/admin/AdminModel.js';
import { hashPassword } from '../utils/bcrypt.js';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import { newAccountEmailVerificationEmail } from '../utils/nodemailer.js';
//admin user login
router.post("/", (res,req,next)=>{
    try{
        res.json({
            status: "success",
            message: "todo register",
        })
    }catch(error){
        next(error)
    }
});

//admin user regisation 
router.post("/register", newAdminValidation,async (req, res, next)=>{
    try{
        req.body.password = hashPassword(req.body.password);
        const emailVerificationCode = uuidv4();
        const result = await createNewAdmin(req.body);
        
        if(result?._id){
            const uniqueLink = `http://localhost:3000/verify?c=${result.emailVerificationCode}&email=${result.emaill}`;
            newAccountEmailVerificationEmail(uniqueLink, result)
            res.json({
                status: "success",
                message: "new user has been registered",
            })

            return;

        }

        res.json({
            status: "success",
            message: "Error, unable to create new user",
        })
    }catch(error){
        
            if (error.message.includes("E11000 duplicate key")) {
              error.message = "There is another user exist with this email";
              error.errorCode = 200;
            } 
        next(error)
    }
});

export default router;