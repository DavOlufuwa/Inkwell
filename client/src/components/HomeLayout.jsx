import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"

const HomeLayout = () => {
  return (
    <div>
      <Navigation/>
      <Outlet />
    </div>
  )
}

export default HomeLayout