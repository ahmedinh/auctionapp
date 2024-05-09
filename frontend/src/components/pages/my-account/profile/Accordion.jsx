import React, { useEffect, useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './Accordion.scss';
import ProfilePicture from '../../../../assets/profile-picture.png';
import { useUserInfoGet } from '../../../../hooks/useUserInfoGet';
import { useUserPictureGet } from '../../../../hooks/useUserPictureGet';
import { useChangeUserInfo } from '../../../../hooks/useChangeUserInfo';
import { useChangeUserPicture } from '../../../../hooks/useChangeUserPicture';

const AccordionExpandIcon = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cvc, setCVC] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');


    const userInfo = useUserInfoGet();
    const userPicture = useUserPictureGet();

    const changeUserInfoMutation = useChangeUserInfo();
    const changeUserPictureMutation = useChangeUserPicture();

    const handleFileChange = event => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            changeUserPictureMutation.mutate(file, {
                onSuccess: () => {
                    userPicture.refetch();
                }
            });
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            firstName,
            lastName,
            email,
            birthDay: parseInt(birthDay),
            birthMonth: parseInt(birthMonth, 10),
            birthYear: parseInt(birthYear, 10),
            phoneNumber,
            cardName,
            cardNumber,
            expirationMonth: parseInt(expirationMonth, 10),
            expirationYear: parseInt(expirationYear, 10),
            cvc: parseInt(cvc, 10),
            shippingStreet: street,
            shippingCity: city,
            shippingZipCode: zipCode,
            shippingState: state,
            shippingCountry: country,
        };
        changeUserInfoMutation.mutate(payload);
    }

    useEffect(() => {
        if (userInfo.data) {
            setFirstName(userInfo.data.firstName);
            setLastName(userInfo.data.lastName);
            setEmail(userInfo.data.email);
            setBirthDay(userInfo.data.birthDay);
            setBirthMonth(userInfo.data.birthMonth);
            setBirthYear(userInfo.data.birthYear);
            setPhoneNumber(userInfo.data.phoneNumber);
            setCardName(userInfo.data.cardName);
            setCardNumber(userInfo.data.cardNumber);
            setExpirationMonth(userInfo.data.expirationMonth);
            setExpirationYear(userInfo.data.expirationYear);
            setCVC(userInfo.data.cvc);
            setStreet(userInfo.data.shippingStreet);
            setCity(userInfo.data.shippingCity);
            setZipCode(userInfo.data.shippingZipCode);
            setState(userInfo.data.shippingState);
            setCountry(userInfo.data.country);
        }
    }, [userInfo.data]);

    return (
        <div className='accordion-section'>
            <Accordion className='user-accordion' defaultExpanded>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='headline-bar'
                >
                    <Typography className='headline-text'>Personal information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="user-section">
                        <div className="picture-section">
                            <img src={userPicture.data?.url ? userPicture.data?.url : ProfilePicture} alt="profile-pic.png" className='profile-picture' />
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <p className='change-photo-button' onClick={() => fileInputRef.current.click()}>
                                Change photo
                            </p>

                        </div>
                        <div className="information-section">
                            <div className="first-name-section">
                                <p>First Name</p>
                                <input type="text" placeholder='John' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="last-name-section">
                                <p>Last Name</p>
                                <input type="text" placeholder='Doe' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="email-section">
                                <p>Email Address</p>
                                <input type="text" placeholder='user@domain.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="date-section">
                                <p>Date of Birth</p>
                                <div className="date-of-birth">
                                    <input type="number" placeholder='DD' name="" id="" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} />
                                    <input type="number" placeholder='MM' name="" id="" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} />
                                    <input type="number" placeholder='YYYY' name="" id="" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
                                </div>
                            </div>
                            <div className="phone-section">
                                <p>Phone Number</p>
                                <div className="for-number">
                                    <input type="text" placeholder='+32534231564' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    <div className="not-verified">
                                        Not verified
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion className='card-information-accordion'>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    className='headline-bar'
                >
                    <Typography className='headline-text'>Card information (Optional)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="full-page">
                        <div className="all-fields">
                            <div className="name-on-card">
                                <p>
                                    Name on Card
                                </p>
                                <input type="text" placeholder='JOHN DOE' value={cardName} onChange={(e) => setCardName(e.target.value)} />
                            </div>
                            <div className="card-number">
                                <p>
                                    Card Number
                                </p>
                                <input type="text" placeholder='XXXX-XXXX-XXXX-XXXX' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                            </div>
                            <div className="expiration-cvc">
                                <div className="exp-date">
                                    <p>Expiration Date</p>
                                    <input type="number" placeholder='MM' value={expirationMonth} onChange={(e) => setExpirationMonth(e.target.value)} />
                                </div>
                                <div className="year-input">
                                    <input type="number" placeholder='YY' value={expirationYear} onChange={(e) => setExpirationYear(e.target.value)} />
                                </div>
                                <div className="CVC-input">
                                    <p>CVC/CVV</p>
                                    <input type="number" placeholder='***' value={cvc} onChange={(e) => setCVC(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion className='address-accordion'>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel2-content"
                    id="panel3-header"
                    className='headline-bar'
                >
                    <Typography className='headline-text'>Shipping Address (Optional)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="address-page">
                        <div className="all-fields">
                            <div className="street">
                                <p>Street</p>
                                <input type="text" placeholder='123 Main Street' value={street} onChange={(e) => setStreet(e.target.value)} />
                            </div>
                            <div className="city">
                                <div className="city-part">
                                    <p>City</p>
                                    <input type="text" placeholder='eg. Madrid' value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className="zip-code-part">
                                    <p>Zip Code</p>
                                    <input type="text" placeholder='XXXXXXX' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                </div>
                            </div>
                            <div className="state">
                                <p>State</p>
                                <input type="text" placeholder='eg. Asturias' value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div className="country">
                                <p>Country</p>
                                <input type="text" placeholder='eg. Spain' value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <div className="save-info">
                <button className="save-info-button" onClick={(e) => handleSubmit(e)}>
                    SAVE INFO
                </button>
            </div>
        </div>
    );
}
export default AccordionExpandIcon;