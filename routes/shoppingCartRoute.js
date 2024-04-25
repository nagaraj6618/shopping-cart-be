const express = require('express')
const router = express.Router()
const imageUpload = require('../middlewares/imageUpload')
const {getAllProducts, addNewProduct, getFileByName} = require('../controllers/productsController')
const {addProductsToCart, getAllCartItems, getCartTotal, checkOutCart} = require('../controllers/shoppingCartController')

router.route('/').get(getAllProducts)

router.route('/assets/:filename').get(getFileByName)

router.route('/upload').post(imageUpload.single('productImage'),addNewProduct)

router.route('/cart').get(getAllCartItems)

router.route('/cartTotal').get(getCartTotal)

router.route('/cart').post(addProductsToCart)

router.route('/checkout').delete(checkOutCart)

module.exports = router