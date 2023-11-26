import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"
import Footer from "./Footer"

const HomeLayout = () => {
  return (
    <div>
      <Navigation/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default HomeLayout