const productModel = require('../models/productsModel')
const cartModel = require('../models/shoppingCartModel')
const PORT = 3500

const getAllProducts = async(request, response) => {
    try{
        const productData = await productModel.find()
        response.status(200).send(productData)
    }
    catch(error)
    {
        response.status(500).json({ErrorMessage:error.message})
    }  
}

const getFileByName = (request, response) =>{
    const {filename} = request.params
    const parentDirectory = (__dirname).split('/controllers')[0]
    const filePath = parentDirectory + "/assets/" + filename
   response.status(200).json({dir:__dirname})
    response.status(200).sendFile(filePath)
}

const addNewProduct = async(request, response) => {
    try{
        const {productID, productName, productCategory, productCost, productStockQuantity} = request.body
        const existingProduct = await productModel.findOne({productID:productID})
        if (existingProduct)
        {
            return response.status(400).json({ErrorMessage:'Product already exists'})
        }
        const {filename} = request.file
        
        const productImagePath = `assets/`+filename

        const productData = 
        {
            productID:productID,
            productName:productName,
            productCategory:productCategory,
            productCost:productCost,
            productStockQuantity:productStockQuantity,
            productImagePath:productImagePath
        }
        
        const newProduct = await productModel.insertMany(productData)
        console.log(newProduct);
        response.status(200).json(newProduct)
    }
    catch(error)
    {
        response.status(500).json({ErrorMessage:error.message})
    }
}



module.exports = {getAllProducts, addNewProduct, getFileByName}