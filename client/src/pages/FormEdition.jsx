import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import UploadWidget from "../components/UploadWidget";
const FormEdition = () => {
  const [tags, setTags] = useState([]);
  const [imgLink, setImgLink] = useState("");


  const handleImgLink = (e) => {
    
  }
  const handleTags = (e) => {
    e.preventDefault();
    if (
      (e.key === "Enter" || e.keyCode === 13) &&
      e.target.value.trim !== ""
    ) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };
  const deleteTag = (index) => {
    const filterTag = tags.filter((tag, i) => i !== index);
    setTags(filterTag);
  };

  

  return (
    <div className="min-h-screen">
      <div className="text-t-light dark:text-t-dark text-center text-xl my-12">
        <h2>Create a new blog post</h2>
      </div>
      <section className="sm:grid sm:place-content-center">
        <form className="form-case gap-4 md:min-w-[45rem]">
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
              placeholder="type a tag and press enter"
              id="tags"
              onKeyDown={handleTags}
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
                    onClick={() => deleteTag(index)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
          <UploadWidget />
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" rows="5" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea name="content" id="content" rows="5" required></textarea>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormEdition;
