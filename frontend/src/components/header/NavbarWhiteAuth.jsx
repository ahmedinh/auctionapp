import React from 'react';
import './NavbarWhiteAuth.scss'
import Logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { homePageRoute } from '../utilities/AppUrls';

export default function NavbarWhiteAuth() {
    const navigate = useNavigate();
    return (
        <div className="white-bar">
            <div className="logo-space">
                <img src={Logo} alt="Logo.png" onClick={() => navigate(homePageRoute + 'new-arrivals')}/>
            </div>
            <hr />
        </div>
    );
};