import categorySchema from './CategorySchema.js'

export const createNewCategory = (obj) => {
  return categorySchema(obj).save();
};

export const readCategories = () => {
    return categorySchema.find();
  };
//@_id must be String
export const getCategoryById = (_obj) => {
  return categorySchema.findById(_íd);
};

export const updateCategory = ({_id, ...rest}) => {
    return categorySchema.findByIdAndUpdate(_id, rest, { new: true });
  };



export const deleteCat  = (_id)=>{
  return categorySchema.findByIdAndDelete(_id);
}
