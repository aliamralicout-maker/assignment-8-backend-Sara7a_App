import { Router } from "express";
import { genaretAccessToken, getAllUsers, getUserById, signIn, signUp, verfyAcount } from "./auth.service.js";
import { auth } from '../../common/middleware/auth.middleware.js'
import { userLoginSchema, userRegisterSchema } from "./auth.validation.js";
import { validation } from "../../common/middleware/services/validation.service.js";
import { checkRole } from "../../common/middleware/checkRole.js";

const router = Router()



// signUp
router.post('/signUp', validation(userRegisterSchema) , async (req, res) => {
    const data = await signUp(req.body)
    res.json(data)
})

// signIn
router.post('/signIn', validation(userLoginSchema), async (req, res) => {
    const data = await signIn(req.body)
    res.json(data)
})

// get user by id
router.get('/get-user-by-id', auth, async (req, res) => {
    const data = await getUserById(req.user.id)
    res.json(data)
})

// genaret access token
router.post('/genaret-access-token', (req, res) => {
    const data = genaretAccessToken(req.body)
    res.json(data)
})

// verfy Acount
router.put('/verfy-acount' , async (req,res)=>{
    const data = await verfyAcount(req.body);
    res.json(data)
})


// git all users
router.get('/get-all-users',auth, checkRole(['admin']) , async (req, res) => {
    const data = await getAllUsers()
    res.json(data)
})









export default router