import { env } from "../../../config/env.service.js";
import jwt from 'jsonwebtoken'


export const generatetoken = (user) => {

    let signature;
    let refreshSignature;
    let aud;

    switch (user.role) {
        case 1:
            signature = env.AdminSignature
            refreshSignature = env.AdminrefreshSignature
            aud = "admin"
            break
        default:
            signature = env.UserSignature
            refreshSignature = env.UserrefreshSignature
            aud = "user"
    }

    const accessToken = jwt.sign({ id: user._id }, signature, { expiresIn: '30min', audience: aud })
    const refreshToken = jwt.sign({ id: user._id }, refreshSignature, { expiresIn: '1y', audience: aud })
    
    return { accessToken, refreshToken }
}


export const genaretAccessTokenFun = (refreshAccessToken) => {

    const data = jwt.decode(refreshAccessToken)    

    let signature;
    let refreshSignature;
    let aud;

    switch (data.aud) {
        case "Admin":
            signature = env.AdminSignature
            refreshSignature = env.AdminrefreshSignature
            aud = "admin"
            break
        default:
            signature = env.UserSignature
            refreshSignature = env.UserrefreshSignature
            aud = "user"
    }

    const decodeddata = jwt.verify(refreshAccessToken, refreshSignature)

    const accessToken = jwt.sign({ id: decodeddata.id }, signature, { expiresIn: '30min', audience: aud })

    return { accessToken }
}