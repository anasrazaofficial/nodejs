const cloudinary = require('cloudinary')

const Product = require('../models/product')
const promise = require('../middlewares/promise')
const CustomError = require('../utils/customError')
const QueryParamExtract = require('../utils/queryParamExtract')


/// Admin routes
const addProductByAdmin = promise(async (req, res, next) => {
    let images = []
    if (!req.files) {
        next(new CustomError("Images are required", 401))
    }

    for (let i = 0; i < req.files.photos.length; i++) {
        let result = await cloudinary.v2.uploader.upload(req.files.photos[i].tempFilePath, { folder: "tshirt-store/products" })
        await images.push({
            id: result.public_id,
            secure_url: result.secure_url
        })
    }

    req.body.photos = images
    req.body.user = req.user.id


    const product = await Product.create(req.body)

    return res.status(200).json({
        success: true,
        product
    })
})

const getAllProductsByAdmin = promise(async (req, res) => {
    const products = await Product.find()

    return res.status(200).json({
        success: true,
        products
    })
})

const updateProductByAdmin = promise(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new CustomError("Product not found on given id", 401))
    }

    if (req.files) {
        let images = []

        if (product.photos.length > 0) {
            for (let i = 0; i < product.photos.length; i++) {
                await cloudinary.v2.uploader.destroy(product.photos[i])
            }
        }

        for (let i = 0; i < req.files.photos.length; i++) {
            const result = await cloudinary.v2.uploader.upload(req.files.photos[i].tempFilePath, { folder: "tshirt-store/products" })
            await images.push({
                id: result.public_id,
                secure_url: result.secure_url
            })
        }
        req.body.photos = images
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    return res.status(200).json({
        success: true,
        product
    })
})

const deleteProductByAdmin = promise(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new CustomError("Product not found on given id", 401));
    }

    if (product.photos.length > 0) {
        for (let i = 0; i < product.photos.length; i++) {
            await cloudinary.v2.uploader.destroy(product.photos[i].id);
        }
    }

    await product.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
})


/// User routes
const getAllProducts = promise(async (req, res) => {
    const pageNo = 6;
    const productObj = new QueryParamExtract(Product.find(), req.query).search().filter()

    productObj.paginate(pageNo)
    const products = await productObj.mongoModel.clone()

    return res.status(200).json({
        success: true,
        products
    })
})

const getProductById = promise(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new CustomError("Product not found on given id", 401))
    }

    return res.status(200).json({
        success: true,
        product
    })
})


module.exports = {
    addProductByAdmin,
    getAllProductsByAdmin,
    updateProductByAdmin,
    deleteProductByAdmin,
    getAllProducts,
    getProductById
}