import express from 'express'
import { databaseConnection } from './database/connections.js'
import { env } from './config/env.service.js'
import authRouter from '../src/module/auth/auth.controller.js'



const app = express()
app.use(express.json())
app.use('/auth', authRouter)

databaseConnection()



// handel Error
app.use((err,req,res,next)=>{
    const stack = env.mode === 'dev' ? err.stack : null
    res.status(err.cause?.status || 500).json({message: err.message , stack})
})


app.listen(env.port , ()=>{
    console.log({message: `server is runing in port ${env.port}`});
})