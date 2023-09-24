import multer from "multer";
import { BadRequestError } from "../errors";



const MAX_FILE_SIZE = 15000000
const whiteListedTypes = [
    'text/plain'
];


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '.');
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create the multer instance
export const upload = multer({ 
    storage: storage, 
    fileSize: MAX_FILE_SIZE,
    fileFilter: (_req, file, cb) => {
        if (!whiteListedTypes.includes(file.mimetype)) {
          return cb(new BadRequestError('The file type is not supported','multer:upload'))
        }
    
        cb(null, true)
      }
});
