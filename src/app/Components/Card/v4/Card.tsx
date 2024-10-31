import ss from './Card.module.scss';
import {useState} from 'react';

import {RiArrowDownSLine} from 'react-icons/ri';
import {FaImage} from 'react-icons/fa6';
import {FaArrowUp} from 'react-icons/fa';

import {Playfair, Karla} from '@/Fonts/fonts';
import {from24ToAmPm} from '@/Functions/fromStringToDate';
import type {Event} from '@/Types/Types';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Card: React.FC<{event: Event}> = ({event}) => {
    const {
        blurb,
        startDate,
        startTime,
        endDate,
        endTime,
        title,
        organiserDetails,
        type,
        ticketLink,
        venue,
        isPastEvent,
    } = event;
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const formatedAddress = venue.length > 50 ? venue.slice(0, 50) + '...' : venue;
    const addressLink = venue.replaceAll(' ', '+').replaceAll(',', '');

    const descriptionOpenCSS = isDescriptionOpen ? ss.open : '';
    const pastEventCSS = isPastEvent ? ss.past : '';

    const openDescriptionHandler = () => setIsDescriptionOpen(!isDescriptionOpen);

    const startDay = new Date(startDate).getDate();
    const endDay = endDate ? new Date(endDate).getDate() : undefined;
    const weekDay = weekdays[new Date(startDate).getDay()];
    const startTimeAmPm = startTime && from24ToAmPm(startTime);
    const endTimeAmPm = endTime && from24ToAmPm(endTime);

    return (
        <div className={`${ss.card} ${pastEventCSS}`}>
            <div className={`${ss.date} ${Playfair.className}`}>
                <div className={ss.days}>
                    <div>{startDay}</div>
                    {endDay && <div>-</div>}
                    {endDay && <div>{endDay}</div>}
                </div>
                <div className={ss.time}>
                    {startTime && <p>{startTimeAmPm}</p>}
                    {endTime && <p>- {endTimeAmPm}</p>}
                    {(startTime || endTime) && <p>,</p>}
                    {weekDay && <p>{weekDay}</p>}
                </div>
            </div>
            <div className={`${ss.title} ${Playfair.className}`}>{title}</div>
            <div className={ss.address}>
                <a href={`http://maps.google.com/?q=${addressLink}`}>{formatedAddress}</a>
            </div>
            <div className={ss.descriptionAndImage}>
                <div className={ss.descriptionHeader} onClick={openDescriptionHandler}>
                    <p>Description</p>
                    <RiArrowDownSLine />
                </div>
                <div className={`${ss.description} ${descriptionOpenCSS}`}>
                    <p>{blurb}</p>
                </div>
                <div className={ss.image}>
                    <FaImage />
                </div>
            </div>
            <div className={ss.typeAndLink}>
                <div className={ss.type}>{type}</div>
                <a className={ss.link} href={ticketLink} target="_blank" rel="noreferrer">
                    <p className={Karla.className}>More Details</p>
                    <FaArrowUp />
                </a>
            </div>
            <div className={`${ss.organiser} ${Playfair.className}`}>{organiserDetails}</div>
        </div>
    );
};

export default Card;
