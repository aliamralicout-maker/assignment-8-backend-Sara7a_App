import { Router } from "express";
import { getUserById, signIn, signUp } from "./auth.service.js";
import { auth } from '../../common/middleware/auth.middleware.js'

const router = Router()

// signUp
router.post('/signUp', async (req, res) => {
    const data = await signUp(req.body)
    res.json(data)
})

// signIn
router.post('/signIn', async (req, res) => {
    const data = await signIn(req.body)
    res.json(data)
})

// get user by id
router.get('/get-user-by-id', auth, async (req, res) => {
    const data = await getUserById(req.user.id)
    res.json(data)
})

export default router