/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { enqueueSnackbar } from "notistack";

const UploadWidget = ({ imgProps }) => {
  const { imgLink, setImgLink } = imgProps;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOADPRESET;

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "url", "unsplash"],
        multiple: false,
      },
      function (error, result) {
        if (result.event === "success") {
          setImgLink(result.info.secure_url);
          enqueueSnackbar("Image uploaded successfully");
        }
        if (error) {
          enqueueSnackbar("Error uploading image");
        }
      }
    );
  });

  return (
    <div className="form-group">
      <label htmlFor="imageUrl">Image</label>
      <div className="flex w-full gap-4 justify-between mb-3">
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={imgLink}
          readOnly
          required
          placeholder="Image URL"
          className="form-control w-4/5 text-gray-400 cursor-not-allowed text-sm
          "
        />
        <button
          type="button"
          onClick={() => widgetRef.current.open()}
          className="grow min-w-max text-xs bg-d-light dark:bg-d-dark text-t-dark py-1 px-3 rounded-md outline-none font-medium"
        >
          select image
        </button>
      </div>
      {imgLink !== "" && (
        <img src={imgLink} className="max-w-lg max-h-44 object-cover" />
      )}
    </div>
  );
};

export default UploadWidget;
