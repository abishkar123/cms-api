import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
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

  export default mongoose.model("resetpasses", SessionSchema)