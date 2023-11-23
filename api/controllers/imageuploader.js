const cloudinary = require("cloudinary").v2;
const imageRouter = require("express").Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "inkwell_images",
    format: async (req, file) => {
      switch (file.mimetype) {
        case "image/jpeg":
          return "jpeg";
        case "image/png":
          return "png";
        case "image/jpg":
          return "jpg";
        case "image/svg+xml":
          return "svg";
        default:
          return "png";
      }
    },
    public_id: (req, file) => file.originalname,
  },
});

const parser = multer({
  storage: storage,
});

imageRouter.post("/", parser.single("image"), async (request, response) => {
  
  const result = await cloudinary.uploader.upload(request.file.path);

  console.log(result);
  
  response.status(200).json({
    message: "Image Uploaded Successfully",
  })
});


imageRouter.delete("/:public_id", async (request, response) => {

  const result = await cloudinary.uploader.destroy(request.params.public_id);
  console.log(result);

  response.status(200).json({
    message: "Image Deleted Successfully",
  })
})

module.exports = imageRouter



