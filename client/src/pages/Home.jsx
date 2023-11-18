import Blogcard from "../components/Blogcard";
const gridBlock = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home = () => {

  return (
    <div>
      <section className="border border-x-0 border-y-t-light dark:border-y-t-dark my-3 md:mb-10">
        <h1 className="dark:text-t-dark text-7xl sm:text-[8rem] md:text-[7rem] 2xl:text-[15rem] font-bold flex justify-between py-2 md:py-1">
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
        <p className="sm:text-xl font-semibold dark:text-t-dark">
          Recent Blog Posts
        </p>
      </section>
      <section className="grid gap-10 sm:grid-cols-2   lg:grid-cols-3 md:px-8 lg:px-16">
        {gridBlock.map((item, index) => (
          <Blogcard key={index} />
        ))}
      </section>
    </div>
  );
};

export default Home;
