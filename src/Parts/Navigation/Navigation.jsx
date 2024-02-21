import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <>
      <nav className="py-3 navbar navbar-expand-sm position-relative" style={{backgroundColor: "rgb(31 31 31)"}}>
        <div className="container">
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="home"
                  style={{
                    color: "white",
                    background: isActive("/home") || isActive("/") || isActive("Car-Inspector-React/") ? "rgb(41 67 49)" : "transparent",
                    borderRadius: "10px",
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="tire"
                  style={{
                    color: "white",
                    background: isActive("/tire") ? "rgb(41 67 49)" : "transparent",
                    borderRadius: "10px",
                  }}
                >
                  Tires
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="belt"
                  style={{
                    color: "white",
                    background: isActive("/belt") ? "rgb(41 67 49)" : "transparent",
                    borderRadius: "10px",
                  }}
                >
                  Motor Belts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="pad"
                  style={{
                    color: "white",
                    background: isActive("/pad") ? "rgb(41 67 49)" : "transparent",
                    borderRadius: "10px",
                  }}
                >
                  Brake Pad
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="caliper"
                  style={{
                    color: "white",
                    background: isActive("/caliper")
                      ? "rgb(41 67 49)"
                      : "transparent",
                    borderRadius: "10px",
                  }}
                >
                  Brake Caliper
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
