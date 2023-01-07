import React from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light py-1 sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bolder fs-1 ms-5" to=''>
                        BackPack
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto me-5">
                            <li className="nav-item ms-2 me-4">
                                <Link className="nav-link active" aria-current="page" to='/'>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item me-3 ms-2">
                                <Link className="nav-link" to='/product'>
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item me-2 ms-2">
                                <Link className="nav-link" to=''>
                                    Contact us
                                </Link>
                            </li>
                            <li className="nav-item me-2 ms-2">
                                <button className="btn btn-primary btn-width">

                                    Login


                                </button>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;