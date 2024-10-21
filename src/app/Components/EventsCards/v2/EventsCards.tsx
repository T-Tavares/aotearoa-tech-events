'use client';

import ss from './EventsCards.module.scss';
import {useState, useEffect, useRef} from 'react';
import type {Event} from '@/Types/Types';
import {dataFetch} from './DataFetch';

import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

import Card from '@/components/Card/v3/Card';
import Loading from '@/components/Loading/Loading';

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
    }, [scrollCoordinates]);
    // ------------------------------------------------------ //

    useEffect(() => {
        dataFetch({setDatabase, setLoading});
    }, []);

    return (
        <>
            <div className={ss.month}>
                <MdKeyboardArrowLeft />
                <p>October</p>
                <MdKeyboardArrowRight />
            </div>
            <div
                className={ss.eventsCardsContainer}
                ref={cardContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                {loading && <Loading message="We are searching for the Best Events, this wont take long" />}
                {database && database.map(event => <Card event={event} key={event.title} />)}
            </div>
        </>
    );
};

export default EventsCards;
