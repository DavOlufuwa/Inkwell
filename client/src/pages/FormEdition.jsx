/* eslint-disable react/prop-types */
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import UploadWidget from "../components/UploadWidget";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import TailSpin from "/icons/tail-spin.svg"
import { enqueueSnackbar } from "notistack";

const FormEdition = ({ editMode }) => {
  const axiosPrivate = useAxiosPrivate();
  const [blogTags, setBlogTags] = useState([]);
  const inputRef = useRef();
  const textAreaRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
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

  // useEffect(() => {
  //   if(editMode) {

  //   }
  // },[])

  const removeTag = (i) => {
    const newTags = [...blogTags];
    newTags.splice(i, 1);
    setBlogTags(newTags);
    setBlogDetails(prevBlogDetails => ({
      ...prevBlogDetails,
      tags: newTags,
    }));
  };

  const handleTags = (e) => {
    const value = e.target.value.trim();
    if ((e.key === "Enter" || e.keyCode === 13) && value !== "") {
      e.preventDefault();
      setBlogTags([...blogTags, value]);
      setBlogDetails( prevBlogDetails => ({
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
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const createPost = async () => {
    const response = await axiosPrivate.post("/api/blogs", blogDetails);
    return response.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createPost();
      enqueueSnackbar("Blog created successfully");
      setBlogDetails({
        ...blogDetails,
        title: "",
        description: "",
        content: "",
        tags: [],
        imageUrl: "",
        imagePublicId: "",
      })
      textAreaRef.current.value = "";
      setIsLoading(false);
    }
    catch (error) {
      enqueueSnackbar("Error creating blog", error.message);
      setIsLoading(false);
    }
  }



  return (
    <div className="min-h-screen">
      <div className="text-t-light dark:text-t-dark text-center text-xl my-12">
        <h2>Create a new blog post</h2>
      </div>
      <section className="sm:grid sm:place-content-center">
        <form
          className="form-case gap-4 md:min-w-[45rem]"
          onSubmit={handleSubmit}
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
          {blogTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {blogTags.map((tag, index) => (
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
              ref={textAreaRef}
              required
            >
            </textarea>
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
            >
            </textarea>
          </div>
          <button type="submit" className="btn">
            {
              isLoading ? (
                <img src={TailSpin} alt="loading" className="w-7 h-7 m-auto"/>
              ) : (
                "Create Post"
              )
            }
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormEdition;
