import React, { useState } from 'react';
import FacebookIcon from '../../../assets/facebook-login-icon.png';
import GmailIcon from '../../../assets/gmail-login-icon.png';
import './Login.scss'
import { useLoginMutation } from '../../../hooks/useLoginMutation';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: performLogin, isLoading, isError, error, data } = useLoginMutation();

    const handleSubmit = (event) => {
        event.preventDefault();
        performLogin({ email, password });
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-text">
                    <h5>LOGIN</h5>
                </div>
                <div className="login-content">
                    <form className="login-data" onSubmit={handleSubmit}>
                        <div className="login-fields">
                            <div className="login-email">
                                <p>Email</p>
                                <input type="text" placeholder='user@domain.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="login-bottom">
                                <div className="login-password">
                                    <p>Password</p>
                                    <input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="remember-me">
                                    <input type="checkbox" name="" id="" />
                                    <p>Remember me</p>
                                </div>
                            </div>
                        </div>
                        <div className="login-buttons">
                            {isError && <p>Error: {error.response?.data.error_message || error.response?.data.email || error.response?.data.password || 'Failed to login'}</p>}
                            <button type='submit' className='main-button' onClick={handleSubmit}>Login</button>
                            <div className="external-services">
                                <div className='facebook-button'>
                                    <img src={FacebookIcon} alt="FacebookIcon" />
                                    Login with Facebook
                                </div>
                                <div className='gmail-button'>
                                    <img src={GmailIcon} alt="GmailIcon" />
                                    Login with Gmail
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="forgot-password">
                        <a href='https://www.facebook.com'>Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};