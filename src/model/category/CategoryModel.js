import catgeorySchema from "./categorySchema.js";

export const createNewCategory = (obj) => {
  return AdminSchema(obj).save();
};

export const readCategories = () => {
    return catgeorySchema.find();
  };

export const getCategoryBYID = (filter, obj) => {
  return catgeorySchema.findOneAndUpdate(filter, obj, { new: true });
};

export const updateCategory = (_id) => {
    return catgeorySchema.findOneAndUpdate(filter, obj, { new: true });
  };



export const deleteCat  = (_id)=>{
  return catgeorySchema.findById(filter);
}
