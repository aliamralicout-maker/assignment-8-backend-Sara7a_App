import { badRequestException } from "../../exciptions/error.exciptions.js"


export const validation = (schema) => {
    return (req, res, next) => {
        const { success, error } = schema.safeParse(req.body)

        if (!success) return badRequestException({ message: "invalid data", extra: error.issues })
        next()
    }
}