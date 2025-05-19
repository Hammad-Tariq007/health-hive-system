
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filenames using timestamp and original file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to check file types
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const fileTypes = /jpeg|jpg|png|gif|mp3|mp4|wav|webm|avi|mov/;
  // Check extension
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image, audio, and video files are allowed.'));
  }
};

// Set upload limits - 10MB for uploads
const limits = {
  fileSize: 10 * 1024 * 1024 // 10MB
};

// Export multer instance
exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});
