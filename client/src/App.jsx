import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import HomeLayout from "./components/HomeLayout"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout /> }>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          
        </Route>
      </Route>
    </Routes>
  )
}

export default App
