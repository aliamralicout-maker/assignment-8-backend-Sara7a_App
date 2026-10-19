import mongoose from 'mongoose'
import { env } from '../config/env.service.js';


export const databaseConnection = () => {

    mongoose.connect(env.databaseUrl).then(() => {

        console.log({ message: "database connected successfully" });


    }).catch((err) => {
        console.log({ message: "database connection failed", error: err });
    })

}