import React, { useState } from 'react';
import FacebookIcon from '../../../assets/facebook-login-icon.png';
import GmailIcon from '../../../assets/gmail-login-icon.png';
import './Register.scss'
import { NavLink } from 'react-router-dom';
import { useRegisterMutation } from '../../../hooks/useRegisterMutation';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: performRegistration, isLoading, isError, error, data } = useRegisterMutation();

    const handleSubmit = (event) => {
        event.preventDefault();
        performRegistration({ firstName, lastName, email, password });
    }
    return (
        <div className="register-page">
            <div className="register-box">
                <div className="register-text">
                    <h5>REGISTER</h5>
                </div>
                <div className="register-content">
                    <form className="register-data" onSubmit={handleSubmit}>
                        <div className="register-fields">
                            <div className="input-field">
                                <p>First Name</p>
                                <input type="text" placeholder='John' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                <p className='error-message'>{error?.response?.data?.firstName}</p>
                            </div>
                            <div className="input-field">
                                <p>Last Name</p>
                                <input type="text" placeholder='Doe' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                <p className='error-message'>{error?.response?.data?.lastName}</p>
                            </div>
                            <div className="input-field">
                                <p>Enter Email</p>
                                <input type="text" placeholder='user@domain.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <p className='error-message'>{error?.response?.data?.email}</p>
                            </div>
                            <div className="input-field">
                                <p>Password</p>
                                <input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <p className='error-message'>{error?.response?.data?.password}</p>
                            </div>
                        </div>
                        <div className="register-buttons">
                            <button type="submit" className='main-button'>Register</button>
                            <div className="external-services">
                                <div className='facebook-button'>
                                    <img src={FacebookIcon} alt="FacebookIcon" />
                                    Signup with Facebook
                                </div>
                                <div className='gmail-button'>
                                    <img src={GmailIcon} alt="GmailIcon" />
                                    Signup with Gmail
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="login-field">
                        <p>Already have an account?</p>
                        <NavLink to='/login' className='login-link'>Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
