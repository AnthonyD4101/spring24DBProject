import React from 'react';
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand text-white" href="/">Wonderland</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="/">Home Page</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/parkInformation">Park Information</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/ticketPurchase">Buy Tickets</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-warning">
                    <Link className="text-black" to="/signIn" style={{ textDecoration: 'none '}}>Sign In</Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
