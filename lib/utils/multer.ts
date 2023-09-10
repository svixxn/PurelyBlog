// import multer, { FileFilterCallback } from "multer";
// import { Request } from "express";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// const cloudinary = require("cloudinary").v2;

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// exports.createSingle = (
//   key: string,
//   folder: string,
//   public_id: string,
//   width: string,
//   height: string
// ) => {
//   const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder: `purelyblog/${folder}`,
//       public_id: public_id,
//       transformation: [
//         { width: parseInt(width), height: parseInt(height), crop: "scale" },
//       ],
//     },
//   });
//   return multer({ storage: storage, fileFilter: fileFilter }).single(key);
// };

// exports.deleteSingle = (folder: string, public_id: string) => {
//   cloudinary.uploader.destroy(`purelyblog/${folder}/${public_id}`);
// };
