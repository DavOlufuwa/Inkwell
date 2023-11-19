import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import HomeLayout from "./components/HomeLayout";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SnackbarProvider } from "notistack";
import useTheme from "./hooks/useTheme";

const App = () => {
  const { darkMode } = useTheme();

  return (
    <SnackbarProvider
      maxSnack={2}
      preventDuplicate
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      style={{
        color: darkMode ? "#819238" : "#F2F2F2",
        padding: "1rem 1.25rem",
        maxWidth: "max-content",
        backgroundColor: darkMode ? "#9685BF" : "#7D5FC5",
        
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path=":id" element={<BlogDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Route>
      </Routes>
    </SnackbarProvider>
  );
};

export default App;
