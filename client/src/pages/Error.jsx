import { Link } from 'react-router-dom'
import ErrorImage from '/images/error-img.svg'

const Error = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center px-4 pt-44 lg:flex-row lg:items-center lg:justify-around">
      <p className="text-t-light dark:text-t-dark font-bold text-2xl text-center ">
        Sorry, Something went wrong go back{" "}
        <Link
          to="home"
          className="text-d-light dark:text-d-dark underline font-semibold text-2xl text-center mt-auto"
        >
          Home
        </Link>
      </p>
      <img
        src={ErrorImage}
        alt="error 404 image"
        className="h-full w-full lg:min-h-[28rem] lg:max-w-[30rem]"
      />
    </div>
  );
}

export default Error
