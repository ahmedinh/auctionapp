import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NavbarWhite.scss";
import Logo from "../../assets/logo.png";
import { Icon } from "@iconify/react";
import '../utilities/Style.scss'

const NavbarWhite = () => {
    const [input, setInput] = useState("");
    const [isSearchFocused] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');
        const isSearchPage = location.pathname === '/home/search' || location.pathname === '/home/search-advanced';

        if (isSearchPage && query) {
            setInput(decodeURIComponent(query));
        } else {
            setInput("");
        }
    }, [location]);

    const handleChange = (value) => {
        setInput(value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/home/search?query=${encodeURIComponent(input)}`);
    };

    return (
        <div className="navbar-white">
            <div className="content-nav-white">
                <img src={Logo} alt="Logo" className="logo" onClick={() => navigate('/home/new-arrivals')}/>
                <div className="right-part">
                    <div className="search">
                        <form onSubmit={handleSearch} className="search-container">
                            <input
                                type="text"
                                placeholder="Try enter: Shoes"
                                className="search-bar"
                                value={input}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                            <button type="submit" className="search-icon">
                                <Icon icon="mdi-light:magnify" className="icon-styling" />
                            </button>
                        </form>
                        {isSearchFocused && (
                            <div className="search-results">

                            </div>
                        )}
                    </div>
                    <div className="buttons">
                        <NavLink to="/home" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
                            HOME
                        </NavLink>
                        <NavLink to="/shop" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
                            SHOP
                        </NavLink>
                        <NavLink to="/my-account" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
                            MY ACCOUNT
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NavbarWhite;