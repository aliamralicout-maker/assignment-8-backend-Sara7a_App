import mongoose, { modelNames } from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../../common/enums/enum.js";
import { de } from "zod/locales";



const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    gender: {
        type: String,
        enum: genderEnum,
        default: genderEnum.male
    },
    role: {
        type: String,
        enum: roleEnum,
        default: roleEnum.user
    },
    provider: {
        type: String,
        enum: providerEnum,
        default: providerEnum.system
    },
    profileImage: {
        type: String,
    },
    coverImage: {
        type: [String]
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema)