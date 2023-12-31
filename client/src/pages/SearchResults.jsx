import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchCard from "../components/SearchCard";

const SearchResults = () => {
  const [activeTab, setActiveTab] = useState("authors");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [searchResults, setSearchResults] = useState({
    titleSearch: [],
    authorSearch: [],
    tagSearch: [],
  });

  const { titleSearch, authorSearch, tagSearch } = searchResults;

  useEffect(() => {
    const fetchSearchResults = async () => {
      const titlePromise = axios.get(
        `https://inkwell-u8co.onrender.com/api/blogs/title?search=${searchQuery}`
      );
      const authorPromise = axios.get(
        `https://inkwell-u8co.onrender.com/api/blogs/author?search=${searchQuery}`
      );
      const tagPromise = axios.get(
        `https://inkwell-u8co.onrender.com/api/blogs/tags?search=${searchQuery}`
      );

      const [titleResponse, authorResponse, tagResponse] = await Promise.all([
        titlePromise,
        authorPromise,
        tagPromise,
      ]);

      setSearchResults({
        ...searchResults,
        titleSearch: titleResponse.data.paginatedResults,
        authorSearch: authorResponse.data.paginatedResults,
        tagSearch: tagResponse.data.paginatedResults,
      });
    };
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <div className="mt-12 mb-5">
        <h1 className="text-2xl font-bold text-gray-400 dark:text-gray-500 break-all">
          Search Results for{" "}
          <span className="text-t-light text-3xl dark:text-white capitalize">
            {searchQuery}
          </span>
        </h1>
      </div>
      <div className="flex justify-start gap-9 border-b border-b-d-dark dark:border-b-d-dark pt-2">
        <div className="relative">
          <div
            role="button"
            onClick={() => setActiveTab("authors")}
            className={`tab ${activeTab === "authors" ? "active" : ""}`}
          >
            Authors
          </div>
          <span className="absolute top-1 -right-3 text-xs font-medium text-t-dark bg-d-light px-1 rounded-full my-auto ml-1 ">
            {authorSearch?.length}
          </span>
        </div>
        <div className="relative">
          <div
            role="button"
            onClick={() => setActiveTab("titles")}
            className={`tab ${activeTab === "titles" ? "active" : ""}`}
          >
            Titles
          </div>
          <span className="absolute top-1 -right-3 text-xs text-t-dark font-medium bg-d-light px-1 rounded-full my-auto ml-1">
            {titleSearch?.length}
          </span>
        </div>
        <div className="relative">
          <div
            role="button"
            onClick={() => setActiveTab("tags")}
            className={`tab ${activeTab === "tags" ? "active" : ""}`}
          >
            Tags
          </div>
          <span className="absolute top-1 -right-3 text-xs text-t-dark font-medium bg-d-light px-1 rounded-full my-auto ml-1">
            {tagSearch?.length}
          </span>
        </div>
      </div>
      {activeTab === "authors" && (
        <div>
          {authorSearch?.length > 0 ? (
            <section className="grid mt-10 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
              {authorSearch?.map((blog) => (
                <SearchCard key={blog.id} post={blog} />
              ))}
            </section>
          ) : (
            <div className="min-h-[50vh] grid place-content-center">
              <p className="text-center font-bold  text-2xl my-auto text-d-light">
                {`No authors found for "${searchQuery}"`}
              </p>
            </div>
          )}
        </div>
      )}
      {activeTab === "titles" && (
        <div>
          {titleSearch?.length > 0 ? (
            <section className="grid mt-10 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
              {titleSearch?.map((blog) => (
                <SearchCard key={blog.id} post={blog} />
              ))}
            </section>
          ) : (
            <div className="min-h-[50vh] grid place-content-center">
              <p className="text-center font-bold  text-2xl my-auto text-d-light">
                {`No titles found for "${searchQuery}"`}
              </p>
            </div>
          )}
        </div>
      )}
      {activeTab === "tags" && (
        <div>
          {tagSearch?.length > 0 ? (
            <section className="grid mt-10 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
              {tagSearch?.map((blog) => (
                <SearchCard key={blog.id} post={blog} />
              ))}
            </section>
          ) : (
            <div className="min-h-[50vh] grid place-content-center">
              <p className="text-center font-bold  text-2xl my-auto text-d-light">
                {`No tags found for "${searchQuery}"`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
