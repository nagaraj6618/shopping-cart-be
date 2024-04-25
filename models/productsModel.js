const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
    productID: {
        type:String,
        required:true,
        unique:true,
        index:true
    },
    productName: {
        type:String,
        required:true
    },
    productCategory: {
        type:String,
        enum:['Electronics','Food & Beverages','Toys','Books'],
        required:true
    },
    productCost: {
        type:Number,
        required:true
    },
    productStockQuantity: {
        type:Number,
        required:true
    },
    productImagePath :{
        type:String,
        required:true,
        unique:true,
        index:true
    }
    },
    {
        collection : 'products'
    }
)

module.exports = mongoose.model('products', productSchema)