import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const Profile = () => {
  const {auth} = useAuth()
  const [activeTab, setActiveTab] = useState("drafts");
  const axiosPrivate = useAxiosPrivate();

  const getAllBlogs = async () => {
    const response = await axiosPrivate.get(`/api/blogs/user/${auth.id}`);
    return response.data;
  }

  const allBlogs = useQuery({
    queryKey: ["allBlogs"],
    queryFn: getAllBlogs,
    retry: false
  })

  const blogList = allBlogs.data

  return (
    <div>
      <div className="text-t-light dark:text-t-dark text-center text-2xl mt-12 mb-5">
        <h2>Profile</h2>
      </div>
      <section className="flex justify-start mt-2 mb-6">
        <div className="text-xl dark:text-t-dark pr-10 pl-3 font-medium border-r-2 border-r-d-dark dark:border-r-d-dark my-auto">
          <p>
            {auth.fullName}
          </p>
          <p className="text-base">
            {auth.email}
          </p>
        </div>
        <div className="my-auto pl-10 dark:text-t-dark pt-1">
        </div>
        <Link to="/newblog" className="btn text-base rounded-lg px-4">
          create a new post
        </Link>
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
      <section>
        <div></div>
      </section>
    </div>
  );
};

export default Profile;
