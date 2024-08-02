const cloudinary = require('cloudinary')

const Product = require('../models/product')
const promise = require('../middlewares/promise')
const CustomError = require('../utils/customError')
const QueryParamExtract = require('../utils/queryParamExtract')

const addProduct = promise(async (req, res, next) => {
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

const getAllProducts = promise(async (req, res, next) => {
    const pageNo = 6;
    const productObj = new QueryParamExtract(Product.find(), req.query).search().filter()

    productObj.paginate(pageNo)
    let products = await productObj.mongoModel.clone()

    return res.status(200).json({
        success: true,
        products
    })
})

module.exports = { addProduct, getAllProducts }