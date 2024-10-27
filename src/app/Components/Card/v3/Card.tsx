import ss from './Card.module.scss';
import {useState} from 'react';

import {RiArrowDownSLine} from 'react-icons/ri';
import {FaImage} from 'react-icons/fa6';
import {FaArrowUp} from 'react-icons/fa';

import {OleoScript, PoetsenOne} from '@/Fonts/fonts';
import {getLocaleDateString, getDay, getTodaysDateMS} from '@/functions/dateHelpers';
import type {Event} from '@/Types/Types';

const Card: React.FC<{event: Event}> = ({event}) => {
    const {blurb, startDate, title, organiserDetails, type, ticketLink, venue} = event;
    const [isOpen, setIsOpen] = useState(false);

    const address = venue.slice(0, 45);
    const toggleDescription = () => setIsOpen(!isOpen);

    const openToggleCSS = isOpen ? ss.open : ss.close;
    const pastEventCSS = startDate > getTodaysDateMS() ? '' : ss.past;
    return (
        <>
            <div className={`${ss.cardContainer} ${pastEventCSS}`}>
                <h1 className={`${ss.day} ${PoetsenOne.className}`}>{getDay(startDate)}</h1>
                <div className={`${ss.card}`}>
                    {/* <div className={`${ss.card} ${ss.past}`}> */}
                    <p className={ss.date}>{getLocaleDateString(startDate)}</p>
                    <p className={`${ss.title} ${OleoScript.className}`}>{title}</p>
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

                    <div className={ss.imageLinkAndType}>
                        <div className={ss.image}>
                            <FaImage />
                        </div>
                        <div className={ss.typeAndLink}>
                            <p className={ss.type}>{type}</p>
                            <a href={ticketLink} className={ss.link}>
                                <p>Link</p>
                                <FaArrowUp />
                            </a>
                        </div>
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
                </div>
            </div>
        </>
    );
};

export default Card;
