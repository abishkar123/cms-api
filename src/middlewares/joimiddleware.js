import Joi from "joi"

export const newAdminValidation = (req, res, next)=>{
    try{

console.log(req.body, "joi")

//condition
const schema = Joi.object({
address: Joi.string().allow("", null),
email:Joi.string().email({ minDomainSegments: 2}),
fName:Joi.string().required(),
lName:Joi.string().required(),
password:Joi.string().required(),
phone:Joi.string().allow("",null), 
}) 

//compair
const {error}=schema.validate(req.body);

error
?res.json({
    status:"error",
    message:"joi is error",
})
:next()
    }catch(error){
    next(error)
    }
}




export const emailVerificationValidation = (req, res, next) => {
    try {
      //conditions
      const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }),
        emailVerificationCode: Joi.string().required(),
      });
  
      //compair
      const { error } = schema.validate(req.body);
  
      error
        ? res.json({
            status: "error",
            message: error.message,
          })
        : next();
    } catch (error) {
      next(error);
    }
  };