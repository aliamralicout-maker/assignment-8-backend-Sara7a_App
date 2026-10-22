import { createClient } from 'redis'
import { env } from '../../config/env.service.js'




export const redisConnection = async () => {
    const client = createClient({
        url: env.redisUrl
    })

    client.on('error', (err) => {
        throw err;
    })
    await client.connect()
    console.log({ message: 'Redis connected successfully'});
    return client
}