/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import TailSpin from "/icons/tail-spin.svg";
import useTheme from "../hooks/useTheme";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const UploadWidget = ({ imgProps }) => {
  const { blogDetails , setBlogDetails } = imgProps;
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { darkMode } = useTheme();

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
          setIsLoading(false);
          setBlogDetails({
            ...blogDetails,
            imageUrl: result.info.url,
            imagePublicId: result.info.public_id,
          })
          enqueueSnackbar("Image uploaded successfully");
        }
        if (error) {
          enqueueSnackbar("Error uploading image");
        }
      }
    );
  });

  const openWidget = () => {
    if (blogDetails.imageUrl !== "" && blogDetails.imagePublicId !== "") {
      enqueueSnackbar(
        "You can only upload a single image, please delete the previous image"
      );
      return;
    }
    setIsLoading(true);
    
    widgetRef.current.open();
    
    setIsLoading(false);
  };

  const deleteImg = async () => {
    const response = await axios.post("/api/upload", {
      public_id: blogDetails.imagePublicId,
    });
    return response;
  };

  const destroyImage = async () => {
    try {
      setIsDeleting(true);
      await deleteImg();
      setBlogDetails({
        ...blogDetails,
        imageUrl: "",
        imagePublicId: "",
      })
      enqueueSnackbar("Image deleted successfully");
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error deleting image", error.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="imageUrl">Image</label>
      <div className="flex w-full gap-4 justify-between mb-3">
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={blogDetails.imageUrl}
          readOnly
          required
          placeholder="Image URL"
          className="form-control w-4/5 text-gray-400 cursor-not-allowed text-sm
          "
        />
        <button
          type="button"
          onClick={openWidget}
          disabled={isLoading}
          className="grow min-w-max text-xs bg-d-light text-t-dark py-1 px-3 disabled:cursor-not-allowed disabled:bg-d-dark rounded-md outline-none font-medium"
        >
          {isLoading ? (
            <img src={TailSpin} className="w-4 h-4 mx-auto" />
          ) : (
            "Select Image"
          )}
        </button>
      </div>
      {blogDetails.imageUrl !== "" ? (
        <div>
          <img
            src={blogDetails.imageUrl}
            className="w-full max-h-32 object-center rounded-md"
          />
          <div>
            <button
              type="button"
              onClick={destroyImage}
              disabled={isDeleting}
              className="text-xs bg-d-light disabled:cursor-not-allowed disabled:bg-d-dark text-t-dark py-[10px] px-2 w-24 mt-2 rounded-md outline-none font-medium"
            >
              {isDeleting ? (
                <img src={TailSpin} className="w-4 h-4 mx-auto" />
              ) : (
                "Delete Image"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="h-32 grid place-content-center rounded-md bg-d-dark ring-1 ring-gray-500 dark:bg-d-dark ">
          <FontAwesomeIcon
            icon={faImage}
            className="w-5 h-5"
            style={{
              color: darkMode ? "white" : "black",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
