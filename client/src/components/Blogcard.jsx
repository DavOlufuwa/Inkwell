import { Link } from "react-router-dom";
import ImageOne from "/images/sample.svg";

const Blogcard = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <img src={ImageOne} alt="" className="w-full" />
          <div className="flex gap-4 absolute top-3 left-2 max-w-full flex-wrap">
            <div
              className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              design
            </div>
            <div
              className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              design
            </div>
            <div
              className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              design
            </div>
            <div
              className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              design
            </div>
            <div
              className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              design
            </div>
            <div
              className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              design
            </div>
            <div
              className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              design
            </div>
            <div
              className="bg-[rgba(196,195,195,0.02)] backdrop-blur-sm text-xs text-white px-2 py-2 rounded-lg max-w-max"
              role="badge"
            >
              design
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-extrabold text-xl py-2 text-t-light dark:text-t-dark mb-2">
          Integer Maecenas Eget Viverra
        </h2>
        <p className="flex justify-between text-sm mb-4">
          <span className="font-bold text-t-light dark:text-slate-300">
            Joanna Wellick
          </span>
          <span className="text-d-light font-bold dark:text-d-dark">
            June 21, 2022
          </span>
        </p>
        <p className="text-sm font-light text-t-light dark:text-t-dark mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsam
          molestiae dolorem delectus culpa? Corporis quo eaque commodi inventore
          tempore!
        </p>
        <Link to="/24" className="text-d-light dark:text-d-light cursor-pointer after:bg-d-light dark:after:bg-d-light relative font-extrabold  after:duration-200 after:w-0 after:absolute  after:left-0 after:-bottom-1 after:h-[2px] hover:after:w-full ">
          View Article
        </Link>
      </div>
    </div>
  );
};

export default Blogcard;
