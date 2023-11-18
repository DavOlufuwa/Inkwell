import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <main className="px-4 sm:px-6 lg:px-8 min-h-[100svh] dark:bg-bg-dark">
      <Outlet />
    </main>
  )
}

export default Layout