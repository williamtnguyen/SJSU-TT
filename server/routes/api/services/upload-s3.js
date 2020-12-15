const multer = require('multer');
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

// Only store images in memory as a buffer for uploading to S3
const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, './headshots/');
  },
});

// Only accept JPG or PNG extensions
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// Middleware that parses 'imageFile' field in request body
const fileMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB max file size
  },
}).single('imageFile');

/**
 * Uploads to an S3 bucket
 * @param {*} bucketName name of bucket
 * @param {*} key name of file
 * @param {*} buffer the file
 */
const uploadToS3 = async (bucketName, key, buffer) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
  };

  const putResult = S3.putObject(uploadParams).promise();
  return putResult;
};

module.exports = { fileMiddleware, uploadToS3 };
