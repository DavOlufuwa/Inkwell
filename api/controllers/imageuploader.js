const cloudinary = require("cloudinary");
const imageRouter = require("express").Router();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

imageRouter.post("/", async (request, response) => {
  const { public_id } = request.body;

  await cloudinary.v2.uploader.destroy(public_id);

  response.status(200).json({
    message: "Image Deleted Successfully",
  });
});

module.exports = imageRouter;
