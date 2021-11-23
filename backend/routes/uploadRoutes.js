import express from 'express';
import multer from 'multer';
import path from 'path';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback){
    callback(null, 'uploads/');
  },
  filename(req, file, callback){
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb){
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(extname && mimetype){
    return cb(null, true);
  } else {
    cb('Images only please!');
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, callback){
    checkFileType(file, callback);
  },
});

router.post('/', upload.single('image'), async (req, res) => {

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    res.send(result.secure_url);
  } catch(err){
    console.log(err);
  }
});

export default router;