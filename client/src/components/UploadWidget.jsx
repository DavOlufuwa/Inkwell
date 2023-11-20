import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOADPRESET;

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current?.createUploadWidget({
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      sources: ["local", "url", "unsplash"],
      multiple: false,
      
    }, function (error, result) {
      if(result.event === "success") {
        console.log("Done! Here is the image info: ", result.info.secure_url);
      }
    })

  }, [])

  return (
    <button type="button" onClick={() => widgetRef.current.open()}>
      upload
    </button>
  )



};

export default UploadWidget;
