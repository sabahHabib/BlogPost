import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { profile, fetchProfile } = useProfile();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchProfile();
    }
  }, []);



  function handleNavigation(path: string) {
    navigate(path);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-4 mb-3 border-bottom">
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="/" className="nav-link px-2 link-secondary">
                Blogs
              </a>
            </li>
            {isLoggedIn && (
              <li>
                <a href="/profile" className="nav-link px-3 link-secondary">
                  Profile
                </a>
              </li>
            )}
          </ul>

          <div className="col-md-3 text-end">
            {isLoggedIn ? (
              <>
                <span className="me-2 px-3">
                  {profile?.f_name} {profile?.l_name}
                </span>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary me-2"
                  onClick={() => handleNavigation("/login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => handleNavigation("/register")}
                >
                  Sign-up
                </button>
              </>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
