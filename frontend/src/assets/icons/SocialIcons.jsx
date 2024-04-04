import React from 'react';
import "./SocialIcons.scss";
import { Icon } from '@iconify/react';

const SocialIcons = () => {
    return (
        <div className="icons">
            <Icon icon="akar-icons:facebook-fill" className='icon' />
            <Icon icon="entypo-social:instagram-with-circle" className='icon' />
            <Icon icon="entypo-social:twitter-with-circle" className='icon' />
        </div>
    );
};
export default SocialIcons;