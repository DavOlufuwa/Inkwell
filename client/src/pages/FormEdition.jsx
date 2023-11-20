import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import UploadWidget from "../components/UploadWidget";
const FormEdition = () => {
  const [tags, setTags] = useState([]);
  const inputRef = useRef();
  const [imgLink, setImgLink] = useState("");

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const handleTags = (e) => {
    const value = e.target.value.trim();
    if ((e.key === "Enter" || e.keyCode === 13) && value !== "") {
      e.preventDefault();
      setTags([...tags, value]);
      inputRef.current.value = "";
    } else if (e.key === "Backspace" && !value) {
      removeTag(tags.length - 1);
    }
  };

  const handleBlur = (e) => {
    const val = e.target.value;
    if (val) {
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-t-light dark:text-t-dark text-center text-xl my-12">
        <h2>Create a new blog post</h2>
      </div>
      <section className="sm:grid sm:place-content-center">
        <form
          className="form-case gap-4 md:min-w-[45rem]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              name="title"
              autoComplete="off"
              id="title"
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
              required
              className="form-control"
            />
          </div>
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
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
          <UploadWidget imgProps={{ imgLink, setImgLink }} />
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" rows="5" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea name="content" id="content" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn">
            Create Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormEdition;
