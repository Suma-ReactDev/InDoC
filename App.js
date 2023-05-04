import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";
import InDoc from "./pages/InDoc";
import InDocForm from "./pages/InDocForm";
import InDocEditForm from "./pages/InDocEditForm";
import Doc from "./pages/Doc";
import DataGridComponent from "./pages/DataGridComponent";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showDocBoard, setShowDocBoard] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);

  const roles = ["ROLE_MODERATOR", "ROLE_ADMIN", "ROLE_USER"]

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowDocBoard(user.roles.find(item => item === "ROLE_MODERATOR" || "ROLE_ADMIN" || "ROLE_USER"));
      setShowDataTable(user.roles.find(item => item === "ROLE_MODERATOR" || "ROLE_ADMIN" || "ROLE_USER"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    setShowDocBoard(false);
    setShowDataTable(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin BodefaultValuesard
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}

          {showDocBoard && (
            <li className="nav-item">
              <Link to={"/doc"} className="nav-link">
                InDoc
              </Link>
            </li>
          )}

          {showDataTable && (
            <li className="nav-item">
              <Link to={"/datagrid"} className="nav-link">
                Data-Table
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li> */}
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register/>} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          {/* <Route path="/doc" element={<InDoc />} />
          <Route path="/adoc" element={<InDocForm />} />
          <Route path="/doc/edit" element={<InDocEditForm />} /> */}

          <Route path="/doc" element={<Doc />}>
            <Route index element={<InDoc />} />
            <Route path="add" element={<InDocForm />}  />
            <Route path="edit/:id" element={<InDocForm />} />
            <Route path="datagrid" element={<DataGridComponent />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;