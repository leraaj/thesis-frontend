import React from "react";
import { useAuth } from "../../../hooks/auth/useAuth";
import { Link } from "react-router-dom";

const Navbar = ({ routes }) => {
  const { logout, isLoading } = useAuth();
  return (
    <nav className="nav">
      <div className="col-12 d-flex justify-content-between p-2">
        <ul className="nav ">
          {routes.map((route, index) => (
            <li key={index} className="nav-item">
              <Link key={route.path} className="nav-link" to={route.path}>
                {route.path.replace("/", "").charAt(0).toUpperCase() +
                  route.path.replace("/", "").slice(1)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="d-flex ">
          <button
            className="btn btn-danger"
            type="button"
            disabled={isLoading}
            onClick={logout}>
            {isLoading ? (
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
