/* eslint-disable react/prop-types */
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadWidget from "../components/UploadWidget";
import axios from "axios";
import TailSpin from "/icons/tail-spin.svg";

import { enqueueSnackbar } from "notistack";
import useAuth from "../hooks/useAuth";

const FormEdition = ({ editMode }) => {
  const [blogTags, setBlogTags] = useState([]);
  const { auth } = useAuth()
  const inputRef = useRef();
  const textAreaRef = useRef();
  const descRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const postToEdit = location.state?.postToEdit;

  const [blogDetails, setBlogDetails] = useState({
    title: "",
    description: "",
    content: "",
    tags: [],
    imageUrl: "",
    imagePublicId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlogDetails({
      ...blogDetails,
      [name]: value,
    });
  };

  const removeTag = (i) => {
    const newTags = [...blogTags];
    newTags.splice(i, 1);
    setBlogTags(newTags);
    setBlogDetails((prevBlogDetails) => ({
      ...prevBlogDetails,
      tags: newTags,
    }));
  };

  const handleTags = (e) => {
    const value = e.target.value.trim();
    if ((e.key === "Enter" || e.keyCode === 13) && value !== "") {
      e.preventDefault();
      setBlogTags([...blogTags, value]);
      setBlogDetails((prevBlogDetails) => ({
        ...prevBlogDetails,
        tags: [...prevBlogDetails.tags, value],
      }));
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleBlur = (e) => {
    const val = e.target.value;
    if (val) {
      if (blogTags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setBlogTags([...blogTags, val]);
      setBlogDetails((prevBlogDetails) => ({
        ...prevBlogDetails,
        tags: [...prevBlogDetails.tags, val],
      }));
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const createPost = async () => {
    const response = await axios.post(
      "https://inkwell-u8co.onrender.com/api/blogs",
      blogDetails,
      {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }
    );
    return response.data;
  };

  const updatePost = async () => {
    const response = await axios.put(
      `https://inkwell-u8co.onrender.com/api/blogs/${postToEdit?.id}`,
      {
        ...blogDetails,
      },
      {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }
    );
    return response.data;
  };

  useEffect(() => {
    if (editMode) {
      setBlogTags([...postToEdit.tags]);
      setBlogDetails({
        ...blogDetails,
        title: postToEdit.title,
        description: postToEdit.description,
        content: postToEdit.content,
        tags: [...postToEdit.tags],
        imageUrl: postToEdit.imageUrl,
        imagePublicId: postToEdit.imagePublicId,
      });
    } else {
      setBlogDetails({
        ...blogDetails,
        title: "",
        description: "",
        content: "",
        tags: [],
        imageUrl: "",
        imagePublicId: "",
      });
      descRef.current.value = "";
      textAreaRef.current.value = "";
    }
  }, [editMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blogDetails.tags.length === 0) {
        enqueueSnackbar("Please add at least one tag");
        return;
      }
      setIsLoading(true);
      await createPost();
      enqueueSnackbar("Post created successfully");
      setBlogDetails({
        ...blogDetails,
        title: "",
        description: "",
        content: "",
        tags: [],
        imageUrl: "",
        imagePublicId: "",
      });
      textAreaRef.current.value = "";
      descRef.current.value = "";
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar("Error creating post", error.message);
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (blogDetails.tags.length === 0) {
        enqueueSnackbar("Please add at least one tag");
        return;
      }
      await updatePost();
      setBlogDetails({
        ...blogDetails,
        title: "",
        description: "",
        content: "",
        tags: [],
        imageUrl: "",
        imagePublicId: "",
      });
      enqueueSnackbar("Post updated successfully");
      setIsLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      enqueueSnackbar("Error updating post", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-t-light dark:text-t-dark text-center text-xl my-12">
        <h2>{editMode ? "Edit a post" : "Create a new post"}</h2>
      </div>
      <section className="sm:grid sm:place-content-center">
        <form
          className="form-case gap-4 md:min-w-[45rem]"
          onSubmit={editMode ? handleUpdate : handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              name="title"
              autoComplete="off"
              id="title"
              value={blogDetails.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              name="tags"
              autoComplete="off"
              placeholder="Type a tag and press enter"
              id="tags"
              onKeyDown={handleTags}
              onBlur={handleBlur}
              ref={inputRef}
              className="form-control"
            />
          </div>
          {blogDetails.tags?.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {blogDetails.tags?.map((tag, index) => (
                <div
                  key={index}
                  role="badge"
                  className="flex items-center gap-1 bg-d-light px-2 py-1  text-t-dark rounded-md"
                >
                  <span className="break-all">{tag}</span>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={() => removeTag(index)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
          <UploadWidget imgProps={{ setBlogDetails, blogDetails }} />
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              rows="5"
              id="description"
              onChange={handleChange}
              defaultValue={blogDetails.description}
              ref={descRef}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              rows="5"
              onChange={handleChange}
              defaultValue={blogDetails.content}
              ref={textAreaRef}
              required
            ></textarea>
          </div>
          {editMode ? (
            <button type="submit" className="btn">
              {isLoading ? (
                <img src={TailSpin} alt="loading" className="w-7 h-7 m-auto" />
              ) : (
                "Update Post"
              )}
            </button>
          ) : (
            <button type="submit" className="btn">
              {isLoading ? (
                <img src={TailSpin} alt="loading" className="w-7 h-7 m-auto" />
              ) : (
                "Create Post"
              )}
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

export default FormEdition;
