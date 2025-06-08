import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";


// Initialize Braintree Gateway
dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});




export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation

    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });

      case !photo && photo.size > 1000000:
        return res.status(500).send({
          error: "photo is required and should be less than 1mb ",
        });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created sucessfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//get all product

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product",
      error: error.message,
    });
  }
};
// get single product

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "single product getting sucessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// get photo Controller

export const productPhotoController = async(req,res)=>{
  try {
    const product = await productModel.findById(req.params.pid).select("photo")
    
    if(product.photo.data){
      res.set('Content-type' , product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while getting photo",
      error

    })
  }
}

// delete product controller

export const deleteProductController = async(req,res)=>{
  try {
     const product= await productModel.findByIdAndDelete(req.params.pid).select("-photo")
     res.status(200).send({
      success:true,
      message:"product deleted sucessfully",
      product
     })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in deleting product",
      error
    })
  }
}
// update product controller
export const updateProductController = async(req,res)=>{
   try {
     const { name, slug, description, price, category, quantity, shipping } =
       req.fields;
     const { photo } = req.files;
     // validation

     switch (true) {
       case !name:
         return res.status(500).send({ error: "name is required" });
       case !description:
         return res.status(500).send({ error: "description is required" });
       case !price:
         return res.status(500).send({ error: "price is required" });
       case !category:
         return res.status(500).send({ error: "category is required" });
       case !quantity:
         return res.status(500).send({ error: "quantity is required" });

       case photo && photo.size > 1000000:
         return res.status(500).send({
           error: "photo is required and should be less than 1mb ",
         });
     }
     const products = await productModel.findByIdAndUpdate(req.params.pid,
      {...req.fields , slug:slugify(name)}, {new:true}
    )
     if (photo) {
       products.photo.data = fs.readFileSync(photo.path);
       products.photo.contentType = photo.type;
     }
     await products.save();
     res.status(201).send({
       success: true,
       message: "Product updated sucessfully",
       products,
     });
   } catch (error) {
     console.log(error);
     res.status(500).send({
       success: false,
       error,
       message: "Error in update product",
     });
   }
}

// product filter controller 
 export const  productFilterController = async (req,res)=>{
try {
  const {checked , radio}=req.body
  let args= {}
  if (checked.length > 0) args.category= checked
  if (radio.length) {
    args.price = { $gte: radio[0], $lte: radio[1] };
  }

  const products = await productModel.find(args);
  res.status(200).send({
    success:true,
    products,
  })
} catch (error) {
  console.log(error)
  res.status(400).send({
    success :false,
    message:"Error While filtering product",
    error
  })
}
 }

 // product count controller
  export const productCountController = async (req,res)=>{
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success:true,
        total
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:"Error in product count",
        error
      })
    }
  }
  // product list controller
  export const productListController = async (req,res)=>{
    try {
      const perPage = 8;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .select("-photo")
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting product",
        error,
      });
    }
  }
// search product controller


export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    res.json({
      success: true,
      products: results, 
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search Product API",
    });
  }
};

// similar product controller
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting similar product",
      error,
    });
  }
};

// get product  by category controller
 export const productCategoryController = async (req, res) => {
   try {
     const category = await categoryModel.findOne({ slug: req.params.slug });
     if (!category) {
       return res.status(404).send({
         success: false,
         message: "Category not found",
       });
     }

     const products = await productModel
       .find({ category: category._id })
       .populate("category");

     res.status(200).send({
       success: true,
       category,
       products,
     });
   } catch (error) {
     console.error(error);
     res.status(500).send({
       success: false,
       message: "Error in getting products by category",
       error,
     });
   }
 };

// payment gateway api
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send( err);
      } else{
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Braintree payment controller
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (err, result) => {
        if (err || !result.success) {
          console.log("Braintree transaction error:", err || result.message);
          return res
            .status(500)
            .send({ success: false, message: err || result.message });
        }

        await new orderModel({
          products: cart,
          payment: result,
          buyer: req.user._id,
        }).save();

        res.json({ success: true });
      }
    );
  } catch (error) {
    console.log("Payment server error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

