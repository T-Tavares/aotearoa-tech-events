'use client';

import ss from './EventsCards.module.scss';
import {useState, useEffect, useRef} from 'react';
import type {Event} from '@/Types/Types';
import {dataFetch} from './DataFetch';

import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import {IoArrowBackCircleSharp, IoArrowForwardCircleSharp} from 'react-icons/io5';

import Card from '@/components/Card/v3/Card';
import Loading from '@/components/Loading/Loading';
import Filter from '@/Components/Filter/Filter';
import {PoetsenOne} from '@/fonts';
interface ScrollCoordinates {
    prevPosition: number;
    currPosition: number;
    offset: number;
}

const EventsCards: React.FC = () => {
    const [database, setDatabase] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const cardContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [scrollCoordinates, setScrollCoordinates] = useState<ScrollCoordinates>({
        prevPosition: 0,
        currPosition: 0,
        offset: 0,
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setScrollCoordinates({
            prevPosition: e.clientX,
            currPosition: e.clientX,
            offset: 0,
        });
        cardContainerRef.current!.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        setScrollCoordinates(prevState => {
            return {
                prevPosition: prevState.currPosition,
                currPosition: e.clientX,
                offset: prevState.prevPosition - e.clientX,
            };
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        cardContainerRef.current!.style.cursor = 'grab';
    };
    const handleMouseLeave = () => {
        setIsDragging(false);
        cardContainerRef.current!.style.cursor = 'grab';
    };

    useEffect(() => {
        if (!isDragging) return;
        const clientOnePercent = window.innerWidth / 100;
        const scrollStep = scrollCoordinates.offset > 0 ? clientOnePercent : -clientOnePercent;
        cardContainerRef.current!.scrollLeft += scrollStep;
    }, [scrollCoordinates, isDragging]);
    // ------------------------------------------------------ //

    const clickScrollLeft = () => {
        cardContainerRef.current!.style.scrollBehavior = 'smooth';
        cardContainerRef.current!.scrollLeft -= window.innerWidth * 0.9;
        setTimeout(() => (cardContainerRef.current!.style.scrollBehavior = 'unset'), 500);
    };
    const clickScrollRight = () => {
        cardContainerRef.current!.style.scrollBehavior = 'smooth';
        cardContainerRef.current!.scrollLeft += window.innerWidth * 0.9;
        setTimeout(() => (cardContainerRef.current!.style.scrollBehavior = 'unset'), 500);
    };

    useEffect(() => {
        dataFetch({setDatabase, setLoading});
    }, []);

    if (loading) return <Loading message="We are searching for the Best Events, this wont take long" />;

    return (
        <>
            <Filter />
            <div className={ss.month}>
                <MdKeyboardArrowLeft />
                <p className={PoetsenOne.className}>October</p>
                <MdKeyboardArrowRight />
            </div>

            <div className={ss.eventsCardsBackdrop}>
                <div
                    className={ss.eventsCardsContainer}
                    ref={cardContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    {database.map(event => (
                        <Card event={event} key={event.title} />
                    ))}
                </div>
                <div className={ss.scrollArrows}>
                    <IoArrowBackCircleSharp onClick={clickScrollLeft} />
                    <IoArrowForwardCircleSharp onClick={clickScrollRight} />
                </div>
            </div>
        </>
    );
};

export default EventsCards;
