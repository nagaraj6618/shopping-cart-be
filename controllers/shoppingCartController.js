const productModel = require('../models/productsModel')
const cartModel = require('../models/shoppingCartModel')
const cartItemsArray = [0]

const addProductsToCart = async(request, response) => {
    const { productID, productName, productCost, productSelectedQuantity, productStockQuantity } = request.body
    const totalProductCost = productCost*productSelectedQuantity
    cartItemsArray[0] += totalProductCost
    const totalCartCost = cartItemsArray[0]

    const cartData = {
        productID:productID,
        productName:productName,
        productCost:productCost,
        productSelectedQuantity: productSelectedQuantity,
        totalProductCost: totalProductCost,
        totalCartCost:totalCartCost
    }
    try
    {
        const updatedStock = await productModel.updateOne({productID:productID},
            {$set:{productStockQuantity:productStockQuantity}})
        const newCartData = await cartModel.insertMany(cartData)
        response.status(200).json(newCartData)
    }
    catch(error)
    {
        response.status(500).json({ErrorMessage:error.message})
    }
}

const getAllCartItems = async(request, response) => {
    try{
        const cartDataItems = await cartModel.find()
        response.status(200).json(cartDataItems)
    }
    catch(error)
    {
        response.status(500).json({ErrorMessage:error.message})
    }
}

const getCartTotal = async(request, response) => {
    try{
        const cartDataItems = await cartModel.find({}).sort({_id:-1}).limit(1);
        response.status(200).json(cartDataItems)
    }
    catch(error)
    {
        response.status(500).json({ErrorMessage:error.message})
    }
}

const checkOutCart = async(request, response) => {
    try{
        const checkOutData = await cartModel.collection.drop()
        response.status(200).json(checkOutData)
    }
    catch(error)
    {
        response.status(500).json({ErrorMessage:error.message})
    }
}

module.exports = {addProductsToCart, getAllCartItems, getCartTotal, checkOutCart}