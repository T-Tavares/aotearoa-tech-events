import ss from './Card.module.scss';
// import {useState} from 'react';

// import {RiArrowDownSLine} from 'react-icons/ri';
// import {FaImage} from 'react-icons/fa6';
// import {FaArrowUp} from 'react-icons/fa';

// import {OleoScript, PoetsenOne} from '@/Fonts/fonts';
// import {getLocaleDateString, getDay, getTodaysDateMS} from '@/functions/dateHelpers';
import type {Event} from '@/Types/Types';

const Card: React.FC<{event?: Event}> = ({event}) => {
    // const {blurb, startDate, title, organiserDetails, type, ticketLink, venue} = event;
    return <div className={ss.card}></div>;
};

export default Card;
