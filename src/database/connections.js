import mongoose from 'mongoose'
import { env } from '../config/env.service.js';


export const databaseConnection = () => {

    mongoose.connect(env.databaseUrl).then(() => {

        console.log({ message: "database is connectd" });


    }).catch((err) => {
        console.log(err);
    })

}