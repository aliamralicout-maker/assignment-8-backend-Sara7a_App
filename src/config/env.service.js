import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path:path.resolve(`./.env.${process.env.NODE_ENV}`)})

const port = process.env.PORT
const databaseUrl = process.env.DATABASE_URI
const salt = process.env.SALT_ROUNDS
const mode = process.env.MODE
const jwtSecret = process.env.JWT_SECRET
const UserSignature = process.env.ACCESS_SIGNATUER_USER
const UserrefreshSignature = process.env.REFRESH_SIGNATUER_USER
const AdminSignature = process.env.ACCESS_SIGNATUER_ADMIN
const AdminrefreshSignature = process.env.REFRESH_SIGNATUER_ADMIN


export const env = {
    port,
    databaseUrl,
    salt,
    mode,
    jwtSecret,
    UserSignature,
    UserrefreshSignature,
    AdminSignature,
    AdminrefreshSignature
}