const cloudinary = require("cloudinary").v2;
const imageRouter = require("express").Router();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});





imageRouter.post("/:public_id", async (request, response) => {
  console.log(request.params.public_id)

  const result = await cloudinary.uploader.destroy(request.params.public_id);
  console.log(result);

  response.status(200).json({
    message: "Image Deleted Successfully",
  })
})

module.exports = imageRouter



