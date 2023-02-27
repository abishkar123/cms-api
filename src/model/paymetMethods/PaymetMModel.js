import paymentMethodSchema from './PaymentMSchema.js'

export const createNewpaymentMethod = (obj) => {
  return paymentMethodSchema(obj).save();
}; 

export const readpaymentMethod= () => {
    return paymentMethodSchema.find();
  };
//@_id must be String
export const getpaymentMethodById = (_obj) => {
  return paymentMethodSchema.findById(_íd);
};

export const updatepaymentMModel = ({_id, ...rest}) => {
    return paymentMethodSchema.findByIdAndUpdate(_id, rest, { new: true });
  };



export const deletepaymentMModel = (_id)=>{
  return paymentMethodSchema.findByIdAndDelete(_id);
}
