import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";

function Navbar({ links = [] }) {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="navbar navbar-expand-lg bg-gradient bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <span></span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#homepageNavbar"
          aria-controls="homepageNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="homepageNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthPage ? (
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Home
                </a>
              </li>
            ) : (
              links.map((link) => (
                <li key={link.url} className="nav-item">
                  <a href={link.url} className="nav-link text-capitalize">
                    {link.name}
                  </a>
                </li>
              ))
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <span className="px-2">{user && user.fullName}</span>
            <a className="btn btn-dark" href="/login">
              Login
            </a>
            <a className="btn btn-dark" href="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
