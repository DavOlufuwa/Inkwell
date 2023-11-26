import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ScrollReset from "./ScrollReset";

const HomeLayout = () => {
  return (
    <>
      <div>
        <Navigation />
        <Outlet />
        <Footer />
      </div>
      <ScrollReset />
    </>
  );
};

export default HomeLayout;
