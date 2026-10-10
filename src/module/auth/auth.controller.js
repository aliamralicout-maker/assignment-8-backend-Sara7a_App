import { Router } from "express";
import { genaretAccessToken, getUserById, signIn, signUp } from "./auth.service.js";
import { auth } from '../../common/middleware/auth.middleware.js'
import { userLoginSchema, userRegisterSchema } from "./auth.validation.js";
import { validation } from "../../common/middleware/services/validation.service.js";


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










export default router