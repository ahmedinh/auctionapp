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
import LoadingSpinner from '../../../utilities/loading-spinner/LoadingSpinner';
import { isDateValid, validateExpirationDate } from '../../../utilities/Common';

const AccordionExpandIcon = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [person, setPerson] = useState();
    const [errors, setErrors] = useState({});
    const userInfo = useUserInfoGet();
    const userPicture = useUserPictureGet();

    const { mutate: updateUserInfo } = useChangeUserInfo();
    const { mutate: updateUserPicture } = useChangeUserPicture();

    const handleFileChange = event => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            updateUserPicture(file, {
                onSuccess: () => {
                    userPicture.refetch();
                }
            });
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};
        const payload = { ...person };

        if (!isDateValid(payload.birthDay, payload.birthMonth, payload.birthYear)) {
            newErrors.date = 'Invalid date';
        }

        if ([payload.cardName, payload.cardNumber, payload.expirationMonth, payload.expirationYear, payload.cvc].some(field => !field)) {
            newErrors.card = 'All card fields must be filled';
        } else {
            if (!/^\d{13,19}$/.test(payload.cardNumber)) {
                newErrors.card = 'Card number must be between 13 and 19 digits and contain only numbers';
            } else if (!validateExpirationDate(payload.expirationMonth, payload.expirationYear)) {
                newErrors.card = 'Invalid expiration date';
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            updateUserInfo(person);
        }
    }

    useEffect(() => {
        if (userInfo.data) {
            setPerson(userInfo.data);
        }
    }, [userInfo.data]);

    const handleOnChangeField = (fieldName, value) => {
        setPerson(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }
    if (status === 'loading' || pictureStatus === 'loading') {
        return <LoadingSpinner />;
    }

    if (userPicture.status === 'pending' || userInfo.status === 'pending')
        return <LoadingSpinner />;

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
                                <input type="text" placeholder='John' value={person?.firstName || ''} onChange={(e) => handleOnChangeField('firstName', e.target.value)} />
                            </div>
                            <div className="last-name-section">
                                <p>Last Name</p>
                                <input type="text" placeholder='Doe' value={person?.lastName || ''} onChange={(e) => handleOnChangeField('lastName', e.target.value)} />
                            </div>
                            <div className="email-section">
                                <p>Email Address</p>
                                <input type="text" placeholder='user@domain.com' value={person?.email || ''} onChange={(e) => handleOnChangeField('email', e.target.value)} />
                            </div>
                            <div className="date-section">
                                <p>Date of Birth</p>
                                <div className="date-of-birth">
                                    <input type="number" placeholder='DD' name="" id="" value={person?.birthDay || ''} onChange={(e) => handleOnChangeField('birthDay', e.target.value)} />
                                    <input type="number" placeholder='MM' name="" id="" value={person?.birthMonth || ''} onChange={(e) => handleOnChangeField('birthMonth', e.target.value)} />
                                    <input type="number" placeholder='YYYY' name="" id="" value={person?.birthYear || ''} onChange={(e) => handleOnChangeField('birthYear', e.target.value)} />
                                </div>
                                {errors.date && <div className="error">{errors.date}</div>}
                            </div>
                            <div className="phone-section">
                                <p>Phone Number</p>
                                <div className="for-number">
                                    <input type="text" placeholder='+32534231564' value={person?.phoneNumber || ''} onChange={(e) => handleOnChangeField('phoneNumber', e.target.value)} />
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
                    <div className="full-content">
                        <div className="all-fields">
                            <div className="name-on-card">
                                <p>
                                    Name on Card
                                </p>
                                <input type="text" placeholder='JOHN DOE' value={person?.cardName || ''} onChange={(e) => handleOnChangeField('cardName', e.target.value)} />
                            </div>
                            <div className="card-number">
                                <p>
                                    Card Number
                                </p>
                                <input type="text" placeholder='XXXX-XXXX-XXXX-XXXX' value={person?.cardNumber || ''} onChange={(e) => handleOnChangeField('cardNumber', e.target.value)} />
                            </div>
                            <div className="expiration-cvc">
                                <div className="exp-date">
                                    <p>Expiration Date</p>
                                    <input type="number" placeholder='MM' value={person?.expirationMonth || ''} onChange={(e) => handleOnChangeField('expirationMonth', e.target.value)} />
                                </div>
                                <div className="year-input">
                                    <input type="number" placeholder='YY' value={person?.expirationYear || ''} onChange={(e) => handleOnChangeField('expirationYear', e.target.value)} />
                                </div>
                                <div className="CVC-input">
                                    <p>CVC/CVV</p>
                                    <input type="number" placeholder='***' value={person?.cvc || ''} onChange={(e) => handleOnChangeField('cvc', e.target.value)} />
                                </div>
                            </div>
                            {errors.card && <div className="error">{errors.card}</div>}
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
                                <input type="text" placeholder='123 Main Street' value={person?.shippingStreet || ''} onChange={(e) => handleOnChangeField('shippingStreet', e.target.value)} />
                            </div>
                            <div className="city">
                                <div className="city-part">
                                    <p>City</p>
                                    <input type="text" placeholder='eg. Madrid' value={person?.shippingCity || ''} onChange={(e) => handleOnChangeField('shippingCity', e.target.value)} />
                                </div>
                                <div className="zip-code-part">
                                    <p>Zip Code</p>
                                    <input type="text" placeholder='XXXXXXX' value={person?.shippingZipCode || ''} onChange={(e) => handleOnChangeField('shippingZipCode', e.target.value)} />
                                </div>
                            </div>
                            <div className="state">
                                <p>State</p>
                                <input type="text" placeholder='eg. Asturias' value={person?.shippingState || ''} onChange={(e) => handleOnChangeField('shippingState', e.target.value)} />
                            </div>
                            <div className="country">
                                <p>Country</p>
                                <input type="text" placeholder='eg. Spain' value={person?.shippingCountry || ''} onChange={(e) => handleOnChangeField('shippingCountry', e.target.value)} />
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