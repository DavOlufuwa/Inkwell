import Blogcard from "../components/Blogcard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const getPublishedBlogs = async () => {
    const response = await axios.get("/api/blogs");
    return response.data;
  };

  const allPublishedBlogs = useQuery({
    queryKey: ["allPublishedBlogs"],
    queryFn: getPublishedBlogs,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const allPublishedPosts = allPublishedBlogs?.data?.paginatedResults;

  return (
    <div className="min-h-[100svh]">
      <section className="border border-x-0 border-y-t-light dark:border-y-t-dark my-3 md:mb-10">
        <h1 className="select-none dark:text-t-dark text-7xl sm:text-[8rem] 2xl:text-[15rem] font-bold flex justify-between py-2 md:py-1">
          <span>I</span>
          <span>N</span>
          <span>K</span>
          <span>W</span>
          <span>E</span>
          <span>L</span>
          <span>L</span>
        </h1>
      </section>
      <section className="mb-5">
        <p className="select-none sm:text-base uppercase font-bold dark:text-t-dark">
          Recent Blog Posts
        </p>
      </section>
      {allPublishedPosts ? (
        <section className="grid mt-10 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
          {allPublishedPosts?.map((blog) => (
            <Blogcard key={blog.id} post={blog} />
          ))}
        </section>
      ) : (
        <div className="min-h-[50vh] grid place-content-center">
          <p className="text-center font-bold  text-2xl my-auto text-d-light">
            Loading Posts ...
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
