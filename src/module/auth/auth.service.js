import { userModel } from "../../database/model/user.model.js"
import { generateCompare, generateHash } from "../../common/middleware/services/encreptio.js"
import { badRequestException, conflicException, notFoundException, unauthorizedException } from "../../common/exciptions/error.exciptions.js"
import { genaretAccessTokenFun, generatetoken } from "../../common/middleware/services/token.service.js"

// signUp
export const signUp = async (body) => {
    // get email and password from body
    const { userName, email, password, confirmPassword, age, gender, role } = body
    //  find user by email
    const findUser = await userModel.findOne({ email })
    // if email exists
    if (findUser) return conflicException({ message: 'email already  exists' })
    // check password
    if (confirmPassword !== password) return badRequestException({ message: "passwords do not match" })
    //  else                                              convert string to number 
    // const hashedPassword = await bcrypt.hash(password, Number(env.salt))
    const hashedPassword = await generateHash(password)
    // create hashed password
    const createUser = await userModel.create({ userName, email, password: hashedPassword, age, gender, role })
    // return user data 
    return { message: 'create successfully', user: createUser }
}


// signIn
export const signIn = async (body) => {
    // get email and password from body
    const { email, password } = body
    // find user by email
    const findEmail = await userModel.findOne({ email })
    // if email not found
    if (!findEmail) return unauthorizedException({ message: "not found email" })
    // compare password with hashed password
    // const comparePassword = await bcrypt.compare(password ,findEmail.password)
    const comparePassword = await generateCompare(password, findEmail.password)
    // if password is incorrect
    if (!comparePassword) return unauthorizedException({ message: "passwords do not match" })
    // const token = jwt.sign({ id: findEmail._id }, env.jwtSecret , {expiresIn:'30min' , audience: 'user'})
    const token = generatetoken(findEmail)
    // return success message
    return { message: "signIn is successfully", token }
}

// get-user-by-id
export const getUserById = async (id) => {
    // find user by id
    const userData = await userModel.findById(id)
    // if user not found
    if (!userData) return notFoundException({ message: "not found users" })
    // return user data
    return { message: "found user", user: userData }
}

// genaret-Access-Token
export const genaretAccessToken = (body)=>{
    const {refreshToken} = body
    // generate accessToken from refreshToken
    const {accessToken} =  genaretAccessTokenFun(refreshToken)
    // if accessToken is invalid
    if(!accessToken) return badRequestException('invalid token')
    // return accessToken
    return {accessToken:accessToken}
}