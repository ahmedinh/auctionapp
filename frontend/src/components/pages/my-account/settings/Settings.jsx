import React from "react";
import './Settings.scss';
import { getUser } from "../../../utilities/Common";
import { useDeactivateUser } from "../../../../hooks/deactivateUserMutation";

export default function Settings() {
    const user = getUser();
    const { mutate: deactivateUser } = useDeactivateUser();
    const handleDeactivate = () => {
        deactivateUser();
    }
    return (
        <div className="full-settings-page">
            <div className="upper">
                <div className="policy-community">
                    <p className="headline">Policy and Community</p>
                    <p className="text">Receive updates on bids and seller's offers. Stay informed through:</p>
                    <div className="checkbox-list">
                        <div className="one-checkbox">
                            <input type="checkbox" className="custom-checkbox" />
                            <p className="label-checkbox">Email</p>
                        </div>
                        <div className="one-checkbox">
                            <input type="checkbox" className="custom-checkbox" />
                            <p className="label-checkbox">Push Notifications</p>
                        </div>
                        <div className="one-checkbox">
                            <input type="checkbox" className="custom-checkbox" />
                            <p className="label-checkbox">SMS Notifications</p>
                        </div>
                    </div>
                </div>
                <div className="contact-information">
                    <p className="contact-info">Contact Information</p>
                    <p className="this-info-can-be-edited">This information can be edited on your profile</p>
                    <div className="email-phone">
                        <div className="email">
                            <p>Email</p>
                            <p className="user-email">{user.email}</p>
                        </div>
                        <div className="phone">
                            <p>Phone</p>
                            {(user.phoneNumber != null && user.phoneNumber !== '') ? <p className="user-number">{user.phoneNumber}</p> : <p className="no-user-number">No number available</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="account-settings">
                    <p className="acc">Account</p>
                    <div className="deactivation">
                        <p className="question">Do you want to deactivate account?</p>
                        <button onClick={handleDeactivate}>DEACTIVATE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};