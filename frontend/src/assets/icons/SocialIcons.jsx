import React from 'react';
import "./SocialIcons.scss";
import { Icon } from '@iconify/react';

const SocialIcons = () => {
    const handleSocialClick = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="icons">
            <Icon 
                icon="akar-icons:facebook-fill" 
                className='icon' 
                onClick={() => handleSocialClick('https://www.facebook.com')}
            />
            <Icon 
                icon="entypo-social:instagram-with-circle" 
                className='icon' 
                onClick={() => handleSocialClick('https://www.instagram.com')}
            />
            <Icon 
                icon="entypo-social:twitter-with-circle" 
                className='icon' 
                onClick={() => handleSocialClick('https://www.twitter.com')}
            />
        </div>
    );
};
export default SocialIcons;