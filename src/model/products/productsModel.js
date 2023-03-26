import productSchema from "./productSchema.js";

export const createproudct = obj =>{
    return productSchema(obj).save()
}

export const readallproduct = () =>{
    return productSchema.find()
}


export const getSingleProduct = (filter) => {
  return productSchema.findOne(filter);
 };

export const getproductbyId= (_id) =>{
  return productSchema.findById(_id)
}


export const updateProuct = (_id, obj) => {
  return productSchema.findByIdAndUpdate(_id, obj, { new: true });
};


export const deleteSignleProduct = (filter) => {
    return productSchema.findOneAndDelete(filter, obj);
  };

//idsArg must be an array of _id
export const deleteProducts = (idsArg) => {
    return productSchema.deleteMany({
      _id: { $in: idsArg },
    });
  };