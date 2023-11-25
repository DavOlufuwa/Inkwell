/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Blogcard = ({post}) => {
  const {author, title, description, tags, imageUrl, id, timeStamp} = post

    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    const datePublished = new Date(timeStamp.publishedAt).toLocaleString(
      "en-GB",
      dateOptions
    );

  return (
    <div>
      <div>
        <div className="relative">
          <img
            src={imageUrl}
            alt="image of blog post"
            className="w-full max-h-60 object-cover rounded-sm brightness-[85%]"
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
        </div>
      </div>
      <div>
        <h2 className="font-extrabold text-xl py-2 text-t-light dark:text-t-dark mb-2">
          {title}
        </h2>
        <p className="flex justify-between text-sm mb-4">
          <span className="font-bold text-t-light dark:text-slate-300">
            by {author.firstName} {author.lastName}
          </span>
          <span className="text-d-light font-bold dark:text-d-dark">
            {datePublished}
          </span>
        </p>
        <p className="text-sm font-light text-t-light dark:text-t-dark mb-4">
          {description}
        </p>
        <Link
          to={`/post/${id}`}
          state={{postToRead : post}}
          className="text-d-light dark:text-d-light cursor-pointer after:bg-d-light dark:after:bg-d-light relative font-extrabold  after:duration-200 after:w-0 after:absolute  after:left-0 after:-bottom-1 after:h-[2px] hover:after:w-full"
        >
          View Article
        </Link>
      </div>
    </div>
  );
};

export default Blogcard;
