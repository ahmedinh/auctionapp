import React from "react";
import './Error.scss'
import Logo from '../../../assets/logo.png';
import NavbarBlack from "../../header/NavbarBlack";
import Footer from "../../footer/Footer";
import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate = useNavigate();
    return (
        <>
            <NavbarBlack />
            <div className="page-full">
                <div className="content">
                    <img src={Logo} onClick={() => navigate('/home/new-arrivals')} />
                    <div className="error-number">
                        <p className="purple-404">404</p>
                        <p className="grey-404">404</p>
                    </div>
                    <div className="below-error">
                        <p>Oops! Looks like the page is Not Found</p>
                        <button onClick={() => navigate('/home/new-arrivals')}>GO BACK</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};