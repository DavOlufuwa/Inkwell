import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProfileBlogCard from "../components/ProfileBlogCard";

const Profile = () => {
  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState("drafts");
  // const axiosPrivate = useAxiosPrivate();

  const getAllBlogs = async () => {
    const response = await axios.get(`/api/blogs/user/${auth.id}`, {
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    });
    return response.data;
  };

  const allBlogs = useQuery({
    queryKey: ["allBlogs"],
    queryFn: getAllBlogs,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const blogList = allBlogs?.data;
  
  const publishedPosts = useMemo(
    () => blogList?.filter((blog) => blog.state === "published"),
    [blogList]
  );

  const draftPosts = useMemo(
    () => blogList?.filter((blog) => blog.state === "draft"),
    [blogList]
  );

  return (
    <div className="md:px-8 lg:px-16">
      <div className="text-t-light dark:text-t-dark text-center text-2xl mt-12 mb-5">
        <h2>Profile</h2>
      </div>
      <section className="flex flex-col gap-5 justify-start sm:flex-row mt-2 mb-6">
        <div className="text-xl dark:text-t-dark sm:pl-3 sm:pr-10 font-medium  sm:border-r-2 border-r-d-dark dark:border-r-d-dark my-auto">
          <p className="break-all">{auth.fullName}</p>
          <p className="text-base">{auth.email}</p>
        </div>
        <div className="my-auto sm:pl-10 dark:text-t-dark pt-1">
          <Link
            to="/newblog"
            className="btn sm:ml-1 text-base rounded-lg px-4 "
          >
            create new post
          </Link>
        </div>
      </section>
      <div className="flex justify-start gap-6 border-b border-b-d-dark dark:border-b-d-dark pt-2">
        <div
          role="button"
          onClick={() => setActiveTab("drafts")}
          className={`tab ${activeTab === "drafts" ? "active" : ""}`}
        >
          Drafts
        </div>
        <div
          role="button"
          onClick={() => setActiveTab("published")}
          className={`tab ${activeTab === "published" ? "active" : ""}`}
        >
          Published
        </div>
      </div>
      {activeTab === "drafts" && (
        <div>
          {draftPosts?.length > 0 ? (
            <section className="grid mt-10 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
              {draftPosts?.map((blog) => (
                <ProfileBlogCard key={blog.id} post={blog} />
              ))}
            </section>
          ) : (
            <div className="min-h-[50vh] grid place-content-center">
              <p className="text-center font-bold  text-2xl my-auto text-d-light">
                You currently have no posts in drafts
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "published" && (
        <div>
          {publishedPosts?.length > 0 ? (
            <section className="grid mt-10 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
              {publishedPosts?.map((blog) => (
                <ProfileBlogCard key={blog.id} post={blog} />
              ))}
            </section>
          ): 
          <div className="min-h-[50vh] grid place-content-center">
            <p className="text-center font-bold  text-2xl my-auto text-d-light">
              You currently have no published posts
            </p>
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default Profile;
