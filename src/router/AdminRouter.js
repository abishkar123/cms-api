import express from 'express'
import { emailVerificationValidation, newAdminValidation } from '../middlewares/joimiddleware.js';
import { createNewAdmin, updateAdmin } from '../model/admin/AdminModel.js';
import { hashPassword } from '../utils/bcrypt.js';

const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import { newAccountEmailVerificationEmail } from '../utils/nodemailer.js';



//admin user loging
router.post("/", (req, res, next) => {
    try {
      res.json({
        status: "success",
        message: "todo login",
      });
    } catch (error) {
      next(error);
    }
  });
  
 // admin user email verification
router.post("/verify", emailVerificationValidation, async (req, res, next) => {
  try {
    // chek if the combination of email and code exist in db if so set the status active and code to "" in the db, also update is email verified to true

    const obj = {
      status: "active",
      isEmailVerified: true,
      emailVerificationCode: "",
    };

    const user = await updateAdmin(req.body, obj);

    if (user?._id) {
      //send email notification
      emailVerifiedNotification(user);

      res.json({
        status: "success",
        message: "Your account has been verified. You may login now",
      });

      return;
    }

    res.json({
      status: "error",
      message: "The link is invalid or expired.",
    });
  } catch (error) {
    next(error);
  }
});
  
  export default router;