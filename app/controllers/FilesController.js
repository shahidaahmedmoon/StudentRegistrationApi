
import multer from "multer";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname
        cb(null, name);
    }
  });



const upload = multer({ storage: storage }).single('file');




// Upload file
export const UploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload failed', error: err.message });
    }
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  });
};



//Read file
export const ReadFile = async (req, res) => {
    try {
      const filePath = path.join(__dirname, '../../uploads/', req.params.filename);
      const fileData = await fs.readFile(filePath, 'utf8'); 
      res.status(200).json({ message: 'File read successfully', data: fileData });
    } catch (error) {
      res.status(500).json({ message: 'Failed to read file', error: error.message });
    }
  };



// Delete file
export const DeleteFile = async (req, res) => {
    try {
      const filePath = path.join(__dirname, '../../uploads', req.params.filename);
      await fs.unlink(filePath); 
      return res.json({status:"success",message:"File deleted"})
    } catch (e) {
        return res.json({status:"fail",message:e.toString()})
    }
  };
    





//File Delete

/*export const DeleteFile=async(req,res)=>{
    try {
        let id=req.params.id;
        let user_id=req.headers['user_id'];
        await TasksModel.deleteOne({"_id":id,"user_id":user_id})
        return res.json({status:"success",message:"File deleted"})
    }
    catch (e) {
        return res.json({status:"fail",message:e.toString()})
    }
}*/