
import logo from "../../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getGenres } from "../genre/genreSlice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../user/userSlice";

const NavBar = () => {
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    useEffect(() => () => dispatch(getGenres()));

    const loginAndRegister = () => {
        return (
            <div className="d-flex" >
                <NavLink to="/login"><button className="btn btn-primary m-2" id="loginbtn">Login</button></NavLink>
                <NavLink to="/register"><button className="btn btn-primary m-2" id="registerbtn">Register</button></NavLink>
            </div>
        )
    }
    const showAccName = () => {
        return (
            <button className="btn btn-primary nav-item dropdown">
                <li className=" " style={{ "listStyle": "none" }}>
                    <a className="nav-link dropdown-toggle text-capitalize" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-fill"></i> {account.name}
                    </a>
                    <ul className="dropdown-menu">
                        <li><NavLink to="/profile" className="text-decoration-none"><i className="bi bi-gear"></i> Profil</NavLink></li>
                        <li><NavLink to="/" className="text-decoration-none" onClick={() => dispatch(logout())} ><i className="bi bi-box-arrow-right" ></i> Logout</NavLink></li>
                    </ul>
                </li>
            </button>
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={logo} alt="logo" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Filme</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Freunde</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/movienight">Filmabend planen</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Irgendwas
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">qwertz</a></li>
                                    <li><a className="dropdown-item" href="#">ztrewq</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {!account ? loginAndRegister() : showAccName()}






                </div>
            </nav>
            <Outlet />

        </div>
    )
}

export default NavBar;
