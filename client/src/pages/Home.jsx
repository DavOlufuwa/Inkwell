import Blogcard from "../components/Blogcard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import InkwellDark from "/images/logo-white.svg";
import InkwellLight from "/images/logo-color.svg";
import useTheme from "../hooks/useTheme";

const Home = () => {
  const { darkMode } = useTheme()
  const getBlogs = async () => {
    const response = await axios.get("/api/blogs");
    return response.data;
  };

  const allPublishedBlogs = useQuery({
    queryKey: ["allPublishedBlogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const allPublishedPosts = allPublishedBlogs?.data?.paginatedResults;

  return (
    <div className="min-h-[100svh]">
      <section className="border border-x-0 border-y-t-light dark:border-y-t-dark my-3 md:mb-10">
        <img
          alt="Inkwell logo"
          className="min-h-[12vh] w-full object-center"
          src={darkMode ? InkwellDark : InkwellLight}
        />
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
