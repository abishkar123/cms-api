import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
      },
      name:{
        type: String,
        required: true,
      },
      description:{
        type: String,
        required: true,
      }

      
    },
    
    {
      timestamps: true,
    }
  );

  export default mongoose.model("paymentMethod", paymentMethodSchema)