/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import useTheme from "../hooks/useTheme";
import { useState } from "react";

const ProfileBlogCard = ({ postCardProps }) => {
  const { author, title, description, tags, imageUrl, state, id, timeStamp } =
    postCardProps;
  const { darkMode } = useTheme();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const dateCreated = new Date(timeStamp.createdAt).toLocaleString(
    "en-GB",
    dateOptions
  );

  const datePublished = new Date(timeStamp.publishedAt).toLocaleString(
    "en-GB",
    dateOptions
  );

  return (
    <div>
      <div className="relative">
        <div>
          <div
            role="button"
            onClick={() => setOptionsOpen(!optionsOpen)}
            className="flex gap-3 items-center justify-end py-1"
          >
            <span className="font-semibold dark:text-d-dark">options</span>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              style={{
                color: darkMode ? "#9685BF" : "black",
              }}
            />
          </div>
        </div>
        <div
          className={`${
            optionsOpen ? "" : "hidden"
          } flex font-bold flex-col gap-3 bg-bg-light absolute z-20 top-6 -right-2 rounded-sm p-1 shadow-xl text-sm`}
        >
          <div
            className="hover:text-purple-900 hover:bg-purple-200 py-1 px-1"
            onClick={() => setOptionsOpen(!optionsOpen)}
          >
            <Link to={`/blog/${id}`}>Edit Post</Link>
          </div>
          <div
            role="button"
            className="hover:text-purple-900 hover:bg-purple-200 py-1 px-1"
            onClick={() => setOptionsOpen(!optionsOpen)}
          >
            <p>Publish Post</p>
          </div>
          <div
            role="button"
            className="hover:text-purple-900 hover:bg-purple-200 py-1 px-1"
            onClick={() => setOptionsOpen(!optionsOpen)}
          >
            <div>Delete Post</div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <div className="h-60 brightness-[75%]">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          <div className="flex gap-4 absolute top-3 left-2 max-w-full flex-wrap">
            {tags?.map((tag, index) => (
              <div
                key={index}
                className="select-none bg-[rgba(205,202,202,0.12)] backdrop-blur-[2px] text-xs text-white px-2 py-2 rounded-lg max-w-max"
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
            {author.firstName} {author.lastName}
          </span>
          <span className="text-d-light font-bold dark:text-d-dark">
            {state === "draft" ? dateCreated : datePublished}
          </span>
        </p>
        <p className="text-sm font-light text-t-light dark:text-t-dark mb-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProfileBlogCard;
