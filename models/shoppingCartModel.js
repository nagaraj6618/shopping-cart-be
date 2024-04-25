const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
    productID: {
        type:String,
        required:true
    },
    productName: {
        type:String,
        required:true
    },
    productCost: {
        type:Number,
        required:true
    },
    productSelectedQuantity: {
        type:Number,
        required:true
    },
    totalProductCost: {
        type:Number,
        required:true
    },
    totalCartCost: {
        type:Number,
        required:true,
        default:0
    },
    },
    {
        collection : 'cart'
    }
)

module.exports = mongoose.model('cart', cartSchema)