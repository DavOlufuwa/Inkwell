import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [searchResults, setSearchResults] = useState(null);

  const search = async () => {
    const response = await axios.get(
      `/api/blogs?search=${searchQuery}`
    );
    return response.data;
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      const results = await search();
      setSearchResults(results);
    }

    fetchSearchResults();
  }, [searchQuery])

  

  return (
    <div>
      <div className="mt-12 mb-5">
        <h1 className="text-2xl font-bold text-gray-400 dark:text-gray-500">
          Search Results for{" "}
          <span className="text-t-light text-3xl dark:text-white capitalize">{searchQuery}</span>
        </h1>
      </div>
      <div className="flex justify-start gap-6 border-b border-b-d-dark dark:border-b-d-dark pt-2">
        <div
          role="button"
          onClick={() => setActiveTab("posts")}
          className={`tab ${activeTab === "posts" ? "active" : ""}`}
        >
          Posts
        </div>
        <div
          role="button"
          onClick={() => setActiveTab("authors")}
          className={`tab ${activeTab === "authors" ? "active" : ""}`}
        >
          Authors
        </div>
        <div
          role="button"
          onClick={() => setActiveTab("titles")}
          className={`tab ${activeTab === "titles" ? "active" : ""}`}
        >
          Titles
        </div>
        <div
          role="button"
          onClick={() => setActiveTab("tags")}
          className={`tab ${activeTab === "tags" ? "active" : ""}`}
        >
          Tags
        </div>
      </div>
    </div>
  );
}

export default SearchResults