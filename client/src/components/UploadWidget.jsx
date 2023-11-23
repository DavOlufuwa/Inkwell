/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import TailSpin from "/icons/tail-spin.svg";
import useTheme from "../hooks/useTheme";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const UploadWidget = ({ imgProps }) => {
  const { imgDetails, setImgDetails } = imgProps;
  const [isLoading, setIsLoading] = useState(false);
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
          setImgDetails({
            ...imgDetails,
            public_id: result.info.public_id,
            url: result.info.url,
          });
          console.log(result.info);
          setIsLoading(false);
          enqueueSnackbar("Image uploaded successfully");
        }
        if (error) {
          enqueueSnackbar("Error uploading image");
        }
      }
    );
  });

  const openWidget = () => {
    setIsLoading(true);
    widgetRef.current.open();
    setIsLoading(false);
  };

  console.log(imgDetails.public_id);

  const deleteImg = async (public_id) => {
    const response = await axios.post(`/api/uploader/${public_id}`, {
      "Content-type": "application/json",
    });
    return response;
  };

  const deleteImage = useMutation({
    mutationFn: deleteImg(imgDetails.public_id),
    onSuccess: () => {
      setImgDetails({
        url: "",
        public_id: "",
      });
      enqueueSnackbar("Image deleted successfully");
    },
    onError: () => {
      enqueueSnackbar("Error deleting image");
    },
  });

  const handleDelete = () => {
    deleteImage.mutate();
  };

  return (
    <div className="form-group">
      <label htmlFor="imageUrl">Image</label>
      <div className="flex w-full gap-4 justify-between mb-3">
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={imgDetails.url}
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
      {imgDetails.url !== "" && (
        <div>
          <img
            src={imgDetails.url}
            className="max-w-lg max-h-32 object-cover"
          />
          <div>
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{
                color: darkMode ? "white" : "black",
              }}
              onClick={() => handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
