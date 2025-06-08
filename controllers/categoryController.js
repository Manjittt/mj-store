import categoryModel from "../models/categoryModel.js"
import slugify from "slugify";

export const createCategoryController =async( req, res)=>{
 try {
    const { name } = req.body;
    if(!name) {
        return res.status(401).send({
            message:"name is required"
        })
    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:"Category Already Exisits"
        })
    }

    const category = await new categoryModel ({name,slug:slugify(name)}).save()
    res.status(201).send({
        success:true,
        message:"new category created",
        category,
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        error,
        message:"Error in category"
    })
 }
}

// UPDATE CATEGORY

export const updateCategoryController = async (req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params
        const category =await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"category updated successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
        
    }

}
// get all category 

export const categoryController =  async (req, res)=>{
 try {
    const category = await categoryModel.find({})
    res.status (200).send({
        success: true,
        message:" all category list",
        category
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error while getting all categories"
    })
 }
}

// single category controller

export const singleCategoryController = async(req,res)=>{
 try {
     
     const category = await categoryModel.findOne({slug:req.params.slug})
     res.status(200).send({
        success:true,
        message:"Get single category sucessfully",
        category,
     })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error while get single category"
    })
 }
}

// Delete Category 

export const deleteCategoryController = async(req,res)=>{
 try {
    const {id} = req.params 
    await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        success:true,
        message:" Category  deleted sucessfully",
        
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in while delete category"
    })
 }
}