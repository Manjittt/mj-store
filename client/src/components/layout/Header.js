import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import {Badge} from 'antd'
const Header = () => {
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();
  const categories = useCategory();
  const cartItems = 0; // Replace with dynamic value from context/state

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.user) {
      setAuth(authData);
    }
  }, [setAuth]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-1">
            <HiMiniShoppingBag /> MJ STORE
          </Link>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <SearchInput />

            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Categories
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/categories" className="dropdown-item">
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link to={`/category/${c.slug}`} className="dropdown-item">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {auth?.user?.name}
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="dropdown-item"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            <li className="nav-item">
              <Badge count={cart.length}showZero>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
