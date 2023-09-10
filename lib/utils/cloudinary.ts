import cloudinary from "cloudinary";
const fs = require("fs");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = async (file: any, folder: string) => {
  return await cloudinary.v2.uploader.upload(
    file,
    {
      folder: folder,
      resource_type: "auto",
    },
    (err: any, result: any) => {
      public_id: result.public_id;
      secure_url: result.secure_url;
    }
  );
};

export { uploads, cloudinary };
