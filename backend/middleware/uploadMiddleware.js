
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let dest = uploadDir;
    
    // Create subdirectories based on file type
    if (file.fieldname === 'image' || file.mimetype.startsWith('image/')) {
      dest = path.join(uploadDir, 'images');
    } else if (file.fieldname === 'audio' || file.mimetype.startsWith('audio/')) {
      dest = path.join(uploadDir, 'audio');
    } else if (file.fieldname === 'video' || file.mimetype.startsWith('video/')) {
      dest = path.join(uploadDir, 'video');
    }
    
    // Ensure the destination directory exists
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    cb(null, dest);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

// File filter configuration
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'image' || file.mimetype.startsWith('image/')) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
    }
  } else if (file.fieldname === 'audio' || file.mimetype.startsWith('audio/')) {
    // Accept audio only
    if (!file.originalname.match(/\.(mp3|MP3|wav|WAV|ogg|OGG)$/)) {
      req.fileValidationError = 'Only audio files are allowed!';
      return cb(new Error('Only audio files are allowed!'), false);
    }
  } else if (file.fieldname === 'video' || file.mimetype.startsWith('video/')) {
    // Accept video only
    if (!file.originalname.match(/\.(mp4|MP4|webm|WEBM|mkv|MKV)$/)) {
      req.fileValidationError = 'Only video files are allowed!';
      return cb(new Error('Only video files are allowed!'), false);
    }
  }
  cb(null, true);
};

exports.upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
});
