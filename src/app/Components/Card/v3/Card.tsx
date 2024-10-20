import ss from './Card.module.scss';
import type {Event} from '@/Types/Types';

import {RiArrowDownSLine} from 'react-icons/ri';
import {FaImage} from 'react-icons/fa6';
import {FaArrowUp} from 'react-icons/fa';

import {useState} from 'react';

const Card: React.FC<{event: Event}> = ({event}) => {
    const {blurb, date, title, organiserDetails, type, ticketLink, venue} = event;
    const [isOpen, setIsOpen] = useState(false);

    const address = venue.slice(0, 45);
    const toggleDescription = () => setIsOpen(!isOpen);
    const openToggleCSS = isOpen ? ss.open : ss.close;

    return (
        <div className={`${ss.card} ${openToggleCSS}`}>
            <p className={ss.date}>{date}</p>
            <p className={ss.title}>{title}</p>
            <p className={ss.organiser}>by {organiserDetails}</p>
            <div className={ss.address}>
                {venue.trim() === 'Online' ? (
                    <p></p>
                ) : (
                    <p>
                        {address}
                        <a className={ss.mapsLink}>&nbsp;&nbsp;&nbsp;...View in Maps</a>
                    </p>
                )}
            </div>
            <div className={ss.typeAndLink}>
                <p className={ss.type}>{type}</p>
                <a href={ticketLink} className={ss.link}>
                    <p>Link</p>
                    <FaArrowUp />
                </a>
            </div>
            <div className={ss.descriptionContainer}>
                <div className={ss.header} onClick={toggleDescription}>
                    <p className={ss.headerTitle}>Description</p>
                    <div className={`${ss.headerArrow} ${openToggleCSS}`}>
                        <RiArrowDownSLine />
                    </div>
                </div>
                <div className={`${ss.descriptionText} ${openToggleCSS}`}>
                    <p>{blurb}</p>
                </div>
            </div>
            <div className={ss.eventImage}>
                <FaImage />
            </div>
            {/* <img src="" alt="" className={ss.eventImage} /> */}
        </div>
    );
};

export default Card;
