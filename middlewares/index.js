const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const sharp = require("sharp");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up multer for temporary file storage before processing
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to process and upload image
const processAndUploadImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Process the image using sharp
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize(100, 100) // Example resize, adjust dimensions as needed
      .jpeg({ quality: 40 }) // Example format and quality settings
      .toBuffer();

    // Create a stream from the processed buffer
    const uploadStream = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "avatars" }, (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    // Upload processed image buffer to Cloudinary
    const result = await uploadStream(processedImageBuffer);

    // Attach Cloudinary response to request object
    req.file.cloudinary = result;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, processAndUploadImage };
