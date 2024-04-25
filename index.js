require('dotenv').config()
const express = require('express')
const app = express()
const shoppingCartRouter = require('./routes/shoppingCartRoute')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT||3500
try{
   mongoose.connect(process.env.DB_URL)
   const db = mongoose.connection
   db.on('error', (errorMessage) => console.log(errorMessage))
   db.once('open', () => console.log(`Connected to the database Successfully`))
}
catch(err){
   console.log({error:err})
}


app.use(cors())
app.use(express.json())
app.get('/',(req,res) => {
   res.status(200).json({Server:"Working.."})
})
app.use('/api/v1/shoppingCart', shoppingCartRouter)

app.listen(PORT, console.log(`Server started running at http://localhost:${PORT}/api/v1/shoppingCart/`))