import express from "express";

import slugify from "slugify";
import {  createproudct, deleteProducts, getproductbyId, readallproduct, updateProuct } from "../model/products/productsModel.js";
import multer from "multer";
import { editProductValidation, newProductValidation } from "../middlewares/joimiddleware.js";
import AWS from 'aws-sdk';
import path from 'path'

const router = express.Router();


const __dirname = path.resolve();
const imgFolderPath = "public/img/products";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let error = null;
//     // validation error check
//     cb(error, imgFolderPath);
//   },
//   filename: (req, file, cb) => {
//     let error = null;
//     const fullFileName = Date.now() + "_" + file.originalname;
//     cb(error, fullFileName);
//   },
// });

// const upload = multer({storage});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});


router.get("/:_id?", async (req, res, next) => {
  try {

    const {_id} = req.params;
    const products = _id ? await getproductbyId(_id) : await readallproduct()
    res.json({
      status: "success",
      message: "get all product list ",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", upload.array("images",5), async (req, res, next) => {
  try {
    //form data => req.body


    
    const option = {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    }
    AWS.config.update(option);
    const s3 = new AWS.S3();
    //form data => req.body

    const newImages = req.files;

    // image => req.files
    // const images = newImages.map((item) => item.path);
    // 

    //upload image to s3
    const uploadPromises = newImages.map((file) => {
      console.log(file)
      const params = {
        Bucket: 'skrnsproduct',
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        // ACL: 'public-read',
        ContentType: file.mimetype,
      };

      return s3.upload(params).promise();
    });

    const uploadResults = await Promise.all(uploadPromises);

    const images = uploadResults.map((result) => result.Location)
    req.body.images = images;

    //END upload image to s3
    req.body.mainImage = images[0];
    req.body.slug = slugify(req.body.name || '', { trim: true, lower: true });
    const result = await createproudct(req.body);
    //get form data
    //get images


    // const newImages = req.files;

    // // image => req.files
    // const images = newImages.map((item) => item.path);
    // req.body.images = images;
    // req.body.mainImage = images[0];
    // req.body.slug = slugify(req.body.name, { trim: true, lower: true });
    // const result = await createproudct(req.body)
    // //get form data
    // //get images

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

router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;

    const { deletedCount } = await deleteProducts(ids);

    deletedCount
      ? res.json({
          status: "success",
          message: "Selected products has been deleted.",
        })
      : res.json({
          status: "erro",
          message: "Unable to delete the products, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

//Update Products

router.put( "/", upload.array("newImages", 5),editProductValidation, async (req, res, next) => {
    try {
      // get the product id
  
      const { _id, ...rest } = req.body;
      // set the new image path
      // remove the deleted item
      console.log(req.body)
      console.log(_id)
      const imgToDeletArg = req.body?.imgToDelete?.split(",") || [];

      // imgToDeletArg.map((item) => fs.unlinkSync(path.join(__dirname, item)));
      //conert string to array
      req.body.images = req.body?.images.split(",");

      const oldImages =
        req.body?.images?.filter((item) => !imgToDeletArg?.includes(item)) ||
        [];

      const newImages = req.files;

      // image => req.files
      const newImagesPath = newImages.map((item) => item.path);
      req.body.images = [...oldImages, ...newImagesPath];
      

      const result = await updateProuct(_id, req.body);

      //get form data
      //get images

      if (result?._id) {
        return res.json({
          status: "success",
          message: "The product has been Updated!",
        });
      }

      res.json({
        status: "error",
        message: "Error updating new product, contact administration",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;