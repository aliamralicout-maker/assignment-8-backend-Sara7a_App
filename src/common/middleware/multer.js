import multer from 'multer'

export const upload = () => {
    const storage = multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })

    const fileFilter = (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        if (!allowedTypes.includes(file.mimetype)) return cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false)
        cb(null, true)
    }

    return multer({ storage, fileFilter })
}