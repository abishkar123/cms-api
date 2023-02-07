import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
      },
      fName: {
        type: String,
        default:"",
      },
      lName: {
        type: String,
      
        
      },

      email: {
        type: String,
        required: true,
        unique: true,
        index: 1,
      },

      phone: {
        type: String,
       

      },
      address: {
        type: String,
        default:"",
      },
  
      password: {
        type: String,
       
      },

      emailVerificationCode:{
        type: String,
        default:"",
      },
      isEmailVerified:{
        type:Boolean,
        default:false,
      },
      
    },
    
    {
      timestamps: true,
    }
  );

  export default mongoose.model("admin_user", adminSchema)