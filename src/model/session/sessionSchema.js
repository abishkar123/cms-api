import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
      },
      token: {
        type: String,
       
      },
    associate: {
        type: String,
      
        
      },
      
    },
    
    {
      timestamps: true,
    }
  );

  export default mongoose.model("resetpasses", sessionSchema)