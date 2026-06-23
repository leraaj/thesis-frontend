import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/external/Login";
import Homepage from "./pages/external/Homepage";
import Register from "./pages/external/Register";

import Accounts from "./pages/internal/Accounts";
import Applicants from "./pages/internal/Applicants";
import Clients from "./pages/internal/Clients";
import Jobs from "./pages/internal/Jobs";
import Chats from "./pages/internal/Chats";
import Profile from "./pages/internal/Profile";

import { useAuth } from "./hooks/auth/useAuth";
import InternalLayout from "./components/layout/InternalLayout/InternalLayout";

function App() {
  const { user, isLoading } = useAuth();

  const DEFAULT_ROUTES = [
    {
      path: "/",
      element: user ? (
        <Navigate
          to={user.role === "admin" ? "/accounts" : "/profile"}
          replace
        />
      ) : (
        <Homepage />
      ),
    },
    {
      path: "/login",
      element: user ? (
        <Navigate
          to={user.role === "admin" ? "/accounts" : "/profile"}
          replace
        />
      ) : (
        <Login />
      ),
    },
    {
      path: "/register",
      element: user ? (
        <Navigate
          to={user.role === "admin" ? "/accounts" : "/profile"}
          replace
        />
      ) : (
        <Register />
      ),
    },
  ];

  const ADMIN_ROUTES = [
    {
      path: "/accounts",
      element: <Accounts />,
    },
    {
      path: "/applicants",
      element: <Applicants />,
    },
    {
      path: "/clients",
      element: <Clients />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/chats",
      element: <Chats />,
    },
  ];

  const EMPLOYEE_ROUTES = [
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/applicants",
      element: <Applicants />,
    },
    {
      path: "/chats",
      element: <Chats />,
    },
  ];

  // if (isLoading) {
  //   return (
  //     <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
  //       <div className="spinner-border m-5" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  let privateRoutes = [];

  switch (user?.role) {
    case "admin":
      privateRoutes = ADMIN_ROUTES;
      break;

    case "applicant":
    case "client":
      privateRoutes = EMPLOYEE_ROUTES;
      break;

    default:
      privateRoutes = [];
  }
  console.log(user);
  console.log("role:", user?.role);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {DEFAULT_ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Private Routes */}
        {privateRoutes.length > 0 && (
          <Route element={<InternalLayout routes={privateRoutes} />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        )}

        {/* Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                !user ? "/" : user.role === "admin" ? "/accounts" : "/profile"
              }
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
