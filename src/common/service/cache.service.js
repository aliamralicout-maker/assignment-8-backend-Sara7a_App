import { redisClient } from "../../database/redis.connection.js";

export const set = async ({ key, value, ttl = undefined }) => {
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    return await redisClient.set(key, value, { EX: ttl });
};

export const get = async ({ key }) => {
    const data = await redisClient.get(key);
    let result
    try {
        result = JSON.parse(data)
    } catch {
        result = data
    }
    return result
}

export const ttl = async ({ key }) =>  await redisClient.ttl(key)
export const exists = async ({ key }) =>  await redisClient.exists(key)
export const del = async ({keys}) => await redisClient.del(keys)
export const keys = async ({prefix}) => await redisClient.keys(`${prefix}`)