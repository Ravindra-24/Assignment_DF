import { Product } from "../db/ProductSchema.js";
import { Category } from "../db/CategorySchema.js";
import cloudinary from '../utils/cloudinary.js'

const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
      message,
      success: status >= 200 && status < 300,
      data,
    });
  };

  export const getProducts = async (req, res) => {
    try {
        const {id} = req.user
        const products = await Product.find({userId: id}).populate('categoryType');
        return handleResponse(res, 200, "Product fetched successfully", products);
    } catch (error) {
        return handleResponse(res, 500, "Internal server error");
    }
  }

  export const createProductItem = async (req, res) => {
    try {
        const {id} = req.user
        const {selectedCategary, productName, packSize, mrp} = req.body
        const file = req.file
        const responseURL = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'posts' }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }).end(file.buffer);
          });

          const product = await Product.create({
            id: Math.floor(Math.random() * 1000),
            productName,
            productImg: responseURL.secure_url,
            status: 'active',
            categoryType: selectedCategary,
            mrp,
            packSize,
            userId: id
          })
        return handleResponse(res, 200, "Product created successfully");
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, "Internal server error");
    }
  }

  export const updateProductItem = async (req, res) => {
    try {
        const {id} = req.user
        const {productId, status, productName, packSize, mrp} = req.body
        const file = req.file
        if(file){
          var responseURL = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'posts' }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }).end(file.buffer);
          });
        }
        const product = await Product.findByIdAndUpdate(productId, {
          ...(file && {productImg: responseURL.secure_url}),
          ...(status && {status}),
          ...(productName && {productName}),
          ...(packSize && {packSize}),
          ...(mrp && {mrp}),
        }
        );
        if (!product) {
            return handleResponse(res, 404, "Product not found");
        }
        return handleResponse(res, 200, "Product updated successfully", product);
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, "Internal server error");
    }
  }

  export const deleteProductItem = async (req, res) => {
    try {
        const {id} = req.user
        const {productId} = req.params
        const productCheck = await Product.findById(productId)
        if(productCheck.userId.toString() !== id){
            return handleResponse(res, 400, "Unauthorized" );
        }
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return handleResponse(res, 404, "Product not found");
        }
        return handleResponse(res, 200, "Product deleted successfully");
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, "Internal server error");
    }
  }

  export const searchProductData = async (req, res) => {
    try {
      const {id} = req.user
      const {_search} = req.query
      const products = await Product.find({userId: id, productName: { $regex: _search, $options: 'i' }}).populate('categoryType');
      return handleResponse(res, 200, "Product fetched successfully", products);
     
    } catch (error) {
      return handleResponse(res, 500, "Internal server error");
    }
  }