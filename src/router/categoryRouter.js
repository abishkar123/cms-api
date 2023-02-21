import express from 'express'
import slugify from 'slugify';
import { createNewCategory, deleteCat, readCategories, updateCategory } from '../model/category/CategoryModel.js';

const router = express.Router()


//create category
router.post("/",async (req, res, next )=>{
    try{
        const {name}= req.body;
       
        const obj ={
            name,
            slug: slugify(name, {
                lower: true,
                trim: true,
            })
        };

        const result = await createNewCategory(obj);
 if(result?._id){
    res.json({
            satatus:"success",
            message:" new category has been creater "
        })}

        res.json({
            satatus:"error",
            message:" there no category you looking"
        })

    }catch(error){
        if(error.message.including("E1000 duplicate key error collection"))
        next(error);
    }
})
//put category
router.get("/",async (req, res, next )=>{
    try{
        const cats = await readCategories();
        res.json({
            satatus:"success",
            message:"Here is the cate lists",
            cats
        })

    }catch(error){
        next(error);
    }
})
//update category
router.put("/", async(req, res, next )=>{
    try{
        const result = await updateCategory(req.body);

        res.json({
            satatus:"success",
            message:"the category has been updated"
        })

    }catch(error){
        next(error);
    }
})
//delete category
router.delete("/:_id?", async (req, res, next )=>{
    const {_id} = req.params
    const result = await deleteCat(_id)
    try{
        res.json({
            satatus:"success",
            message:"Category has been deleted "
        })
    }catch(error){
        next(error);
    }
})

export default router;