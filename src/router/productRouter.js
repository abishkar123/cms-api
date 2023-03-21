import express from "express";

import slugify from "slugify";
import {  createproudct, deleteProducts, getproductbyId, readallproduct } from "../model/products/productsModel.js";
import multer from "multer";
import { newProductValidation } from "../middlewares/joimiddleware.js";


const router = express.Router();
const imgFolderPath = "public/img/products";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    // validation error check
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = null;
    const fullFileName = Date.now() + "_" + file.originalname;
    cb(error, fullFileName);
  },
});

const upload = multer({storage});

router.get("/:_id?", async (req, res, next) => {
  try {

    const {_id} = req.params
    const products = _id ?await getproductbyId(_id) : await readallproduct()
    res.json({
      status: "success",
      message: "get all product list ",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", upload.array("images",5), newProductValidation, async (req, res, next) => {
  try {
    //form data => req.body

    const newImages = req.files;

    // image => req.files
    const images = newImages.map((item) => item.path);
    req.body.images = images;
    req.body.mainImage = images[0];
    req.body.slug = slugify(req.body.name, { trim: true, lower: true });
    const result = await createproudct(req.body)
    //get form data
    //get images

    if (result?._id) {
      return res.json({
        status: "success",
        message: "The product has been added!",
      });
    }

    res.json({
      status: "error",
      message: "Error adding new product, contact administration",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "There is already another product has same sluge, Pelase change the produt name and try agnain later.";
    }
    next(error);
  }
});


//Delete Products
router.delete("/:_id?",async (req, res, next)=>{
  try{
      const {_id} = req.params
      const result = await deleteProducts(_id)
  
      if(result?._id){
          return res.json({
              status: "success",
              message: "successfully delte the products",
          })
      }
          res.json({
              status:"error",
              message:"unable to delete the Products"
          })
  }catch(error){
      next(error)
  }
})

export default router;