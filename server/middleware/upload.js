const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `team-${Date.now()}${ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only JPG/PNG/WEBP allowed'))
}

module.exports = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } })