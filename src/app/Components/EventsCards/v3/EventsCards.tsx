'use client';

import ss from './EventsCards.module.scss';
import {useState, useEffect, useRef} from 'react';

import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import {IoArrowBackCircleSharp, IoArrowForwardCircleSharp} from 'react-icons/io5';

import type {Event} from '@/Types/Types';
import Card from '@/components/Card/v4/Card';
import Loading from '@/components/Loading/Loading';
import Filter from '@/Components/Filter/Filter';
import {dataFetch} from './DataFetch';
import {PoetsenOne} from '@/fonts';

const EventsCards: React.FC = () => {
    // ------------- DATABASE AND LOADING STATES ------------ //

    const [database, setDatabase] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // ------------------------------------------------------ //
    // ------------- DATABASE FETCHING useEffect ------------ //
    // ------------------------------------------------------ //

    useEffect(() => {
        dataFetch({setDatabase, setLoading});
    }, []);

    // ------------------------------------------------------ //
    // ----------------- COMPONENT RENDERING ---------------- //
    // ------------------------------------------------------ //

    // if (loading) return <Loading message="We are searching for the Best Events, this wont take long" />;

    return (
        <>
            <Filter />
            <div className={ss.month}>
                <MdKeyboardArrowLeft />
                <p className={PoetsenOne.className}>October</p>
                <MdKeyboardArrowRight />
            </div>
            <div className={ss.eventsCardsContainer}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </>
    );
};

export default EventsCards;
