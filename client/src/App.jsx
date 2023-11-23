import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import HomeLayout from "./components/HomeLayout";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SnackbarProvider } from "notistack";
import FormEdition from "./pages/FormEdition";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import SearchResults from "./pages/SearchResults";
import PersistLogin from "./components/PersistLogin";

const App = () => {

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
        color: "#F2F2F2",
        padding: "0.5rem 1.25rem",
        fontSize: "1.125rem",
        maxWidth: "max-content",
        backgroundColor: "#7D5FC5",
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<BlogDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="search" element={<SearchResults />} />

            {/* Protected Routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route
                  path="newblog"
                  element={<FormEdition editMode={false} />}
                />
              </Route>

              <Route element={<RequireAuth />}>
                <Route
                  path="editblog/:id"
                  element={<FormEdition editMode={true} />}
                />
              </Route>

              <Route element={<RequireAuth />}>
                <Route path="profile/:id" element={<Profile />} />
              </Route>
            </Route>

            <Route path="*" element={<Error />} />
          </Route>
        </Route>
      </Routes>
    </SnackbarProvider>
  );
};

export default App;
