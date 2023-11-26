import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    author: {},
    tags: [],
    readingTime: "",
    readCount: "",
    imageUrl: "",
    imagePublicId: "",
    content: "",
    timeStamp: {},
  });

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  const {
    title,
    description,
    author,
    tags,
    readingTime,
    readCount,
    imageUrl,
    content,
    timeStamp,
  } = postDetails;

  const datePublished = new Date(timeStamp.publishedAt).toLocaleString(
    "en-GB",
    dateOptions
  );

  useEffect(() => {
    const fetchPostDetails = async () => {
      const response = await axios.put(`/api/blogs/readcount/${id}`);
      setPostDetails({
        ...postDetails,
        ...response.data,
      });
    };

    fetchPostDetails();
  }, [id]);

  return (
    <div className="pt-10 md:px-8 lg:px-16 xl:px-32">
      <div className="text-sm sm:text-base my-3 font-medium flex justify-between dark:text-t-dark">
        <span>
          {readingTime} min{readingTime > 1 ? "s" : ""} read
        </span>
        <span>
          {readCount} view{readCount > 1 ? "s" : ""}
        </span>
      </div>
      <div className="relative">
        <img
          src={imageUrl}
          alt=""
          className="w-full brightness-[45%] object-cover max-h-[20rem] md:max-h-[30rem] "
        />
        <div className="flex gap-4 absolute top-3 left-2 max-w-full flex-wrap">
          {tags?.map((tag, index) => (
            <div
              key={index}
              className="select-none bg-[rgba(7,55,94,0.14)] backdrop-blur-[2px] text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="absolute z-20 bottom-0 left-2">
          <h2 className="uppercase tracking-wider font-bold text-xl sm:text-4xl lg:text-5xl lg:leading-[4rem] py-2 px-1 text-white dark:text-t-dark mb-3">
            {title}
          </h2>
        </div>
      </div>
      <div>
        <p className="font-light text-center text-[14px] sm:text-base text-t-light my-4 dark:text-c-dark">
          {description}
        </p>
      </div>
      <div className="my-5">
        <div className="flex justify-between text-sm text-c-light dark:text-c-dark font-semibold">
          <span>
            By {author.firstName} {author.lastName}
          </span>
          <span>{datePublished}</span>
        </div>
      </div>
      <article className="first-letter:capitalize first-letter:font-semibold first-letter:text-4xl font-light leading-[1.9rem] sm:leading-[1.85rem] sm:max-w-3xl mx-auto dark:text-t-dark">
        <p>{content}</p>
      </article>
    </div>
  );
};

export default BlogDetails;
