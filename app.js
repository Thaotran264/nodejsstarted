const express = require('express')
const logger = require('morgan')
const mongoClient = require('mongoose')
const bodyParser = require('body-parser')
// set up connect mongodb by mongoose
//
mongoClient.connect('mongodb+srv://rmtran2604:T8GAgBi0JhRuKNUu@cluster0.r4ymvdr.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Connect DB success!!!'))
.catch((err)=>console.error(`Connect DB error!!!: ${err}`))

const app = express()
const userRouter = require('./routes/user')
const deckRouter = require('./routes/deck')

// Midderware
app.use(logger('dev'))
app.use(bodyParser.json())
// Routes
app.get('/',(req, res,next)=>{
    return res.status(200).json({message:'Server is Ok'})
})
app.use('/users', userRouter)
app.use('/decks', deckRouter)
// Catch 404 errors and forward them to handle error
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handle function
app.use((err,req,res,next)=>{
    const error = app.get('env') ===  'development' ? err : {}
    const status = err.status || 500

    return res.status(status).json({error:  {
        message: error.message
    }})
})


const port = app.get('port') || 3000
app.listen(port, ()=>console.log(`Server is running on port ${port}`))