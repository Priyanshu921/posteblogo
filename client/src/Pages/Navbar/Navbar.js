import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { UserActions } from '../../Actions/UserActions';

export const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const handleLogout = () => {
    console.log("kssnfkjsndfkjsdfkjasdfkjasddf working")
    dispatch(UserActions.logoutUser())
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Post-e-Blogo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/add-post"?"active":""}`} to="/add-post">
                  Add Post
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav .align-self-end">
              <li className="nav-item ">
                <Link className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
