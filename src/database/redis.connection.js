import {createClient} from 'redis'
import { env } from '../config/env.service.js'


export const redisClient = createClient({
    url: env.redisUrl
})


export const connectRedis = async () => {
    try {
        await redisClient.connect()
        console.log({message: 'redis connected successfully'})
    }catch (error) {
        console.log({message: 'redis connection failed', error})
    }
}