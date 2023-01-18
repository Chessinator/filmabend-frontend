
import logo from "../../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getGenres } from "../genre/genreSlice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";


const NavBar = () => {
    const account = useSelector(state => state.account);
    const loginAndRegister = () => {
        return (
            <div className="d-flex" >
                <NavLink to="/login"><button className="btn btn-primary m-2">Login</button></NavLink>
                <NavLink to="/register"><button className="btn btn-primary m-2">Register</button></NavLink>
            </div>
        )
    }

    const showAccName = () => {
        return (
            <div>
                {account.name}
            </div>

        )
    }

    const dispatch = useDispatch();
    useEffect(() => () => dispatch(getGenres()));

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                                <a className="nav-link" href="#">Filmabend planen</a>
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
                    {account != {} ? loginAndRegister() : showAccName()}




                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar;
