import bcrypt from 'bcrypt'
import {env} from '../../../config/env.service.js'




export const generateHash = async (plainText , salt = env.salt)=>{
    return await bcrypt.hash(plainText , Number(salt))
}


export const generateCompare = async (plainText , hashText)=>{
    return await bcrypt.compare(plainText,hashText)
}