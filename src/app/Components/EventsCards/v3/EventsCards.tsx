'use client';

import ss from './EventsCards.module.scss';
import {useState, useRef, useEffect} from 'react';
import Card from '@/components/Card/v4/Card';
import {Event} from '@/Types/Types';
import {getTodaysDateMS} from '@/Functions/dateHelpers';
import {dataFetch} from './DataFetch';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

const EventsCards: React.FC = () => {
    const BASIS_SPEED = 10; //                                                  Basis Speed for Scrolling

    // ----------------------- useRefs ---------------------- //

    const refCardsContainer = useRef<HTMLDivElement>(null); //                  Ref to Cards Container
    const refDivisor = useRef<HTMLDivElement>(null); //                         Ref to Divisor

    const refScrollBar = useRef<HTMLDivElement>(null); //                       Ref to ScrollBar
    const refScrollBarThumb = useRef<HTMLDivElement>(null); //                  Ref to ScrollBarThum

    // ------------------- DATABASE STATE ------------------- //

    const [database, setDatabase] = useState<Event[]>([]); //                   Database State
    const [loading, setLoading] = useState<boolean>(true); //                   Loading State

    // -------------- DRAGGING STATE VARIABLES -------------- //

    const [isDragging, setIsDragging] = useState(false); //                     Dragging State
    const [dragStart, setDragStart] = useState({startX: 0, startTime: 0}); //   Mouse Start Position and Time => For Speed Calculation
    const [mouseX, setMouseX] = useState(0); //                                 Current Mouse ClientX Position
    const [prevDirection, setPrevDirection] = useState<'left' | 'right'>(); //  State used to catch changing in direction

    // ---------------------- SCROLLBAR --------------------- //

    const cardsContainer = () => refCardsContainer.current!;
    const scrollBar = () => refScrollBar.current!;
    const scrollBarThumb = () => refScrollBarThumb.current!;
    const divisor = () => refDivisor.current!;

    // ------------------------------------------------------ //
    // -------------- DRAGGING HELPER FUNCTIONS ------------- //
    // ------------------------------------------------------ //

    const getDragSpeed = (direction: 'left' | 'right') => {
        //
        const {startTime, startX} = dragStart;
        const endTime = getTodaysDateMS();
        const distance = direction === 'left' ? mouseX - startX : startX - mouseX;
        const speed = distance / (endTime - startTime);
        return +speed.toFixed(2);
    };

    const shiftDirectionReset = (direction: 'left' | 'right', e: React.MouseEvent) => {
        setPrevDirection(prevDirection => {
            if (prevDirection === direction) return direction;
            setDragStart({startX: e.clientX, startTime: getTodaysDateMS()});
            setMouseX(e.clientX);
            return direction;
        });
    };

    const smoothingScrollEnd = (speed?: number) => {
        if (!speed) return;

        const screenWidth = window.innerWidth;
        const scrollLeft = refCardsContainer.current!.scrollLeft;

        let scrollSmoothDistance;
        if (speed < 1) scrollSmoothDistance = 0;
        else if (speed >= 1 && speed < 2) scrollSmoothDistance = screenWidth / 4;
        else if (speed >= 2 && speed < 3) scrollSmoothDistance = screenWidth / 2;
        else scrollSmoothDistance = screenWidth;

        refCardsContainer.current!.style.scrollBehavior = 'smooth';

        if (scrollSmoothDistance) {
            if (prevDirection === 'left') refCardsContainer.current!.scrollLeft = scrollLeft - scrollSmoothDistance!;
            else if (prevDirection === 'right')
                refCardsContainer.current!.scrollLeft = scrollLeft + scrollSmoothDistance!;
        }

        // --------------- SMOOTHNESS OF SCROLLBAR -------------- //
        // TODO - Apply continuous smoothness to ScrollBar Thumb -> maybe consider speed logic to how far it should go

        scrollBarThumb().style.transition = 'left 0.5s';
        setTimeout(() => {
            scrollBarThumb().style.left = `${getScrollPositionPercentage()}%`;
            refCardsContainer.current!.style.scrollBehavior = 'auto';
        }, 500);
        setTimeout(() => (scrollBarThumb().style.transition = 'none'), 1000);
    };

    const smoothScrollTo = (position: number) => {
        refCardsContainer.current!.style.scrollBehavior = 'smooth';
        refCardsContainer.current!.scrollLeft = position;
        setTimeout(() => {
            scrollBarThumb().style.left = `${getScrollPositionPercentage()}%`;
            refCardsContainer.current!.style.scrollBehavior = 'auto';
        }, 300);
    };

    // ------------------------------------------------------ //
    // ------------- SCROLLBAR HELPER FUNCTIONS ------------- //
    // ------------------------------------------------------ //

    const getScreenToScrollPercentage = () => {
        const screenWidth = window.innerWidth;
        const totalScrollWidth = refCardsContainer.current!.scrollWidth;
        const screenToScrollPercentage = +((screenWidth / totalScrollWidth) * 100).toFixed(2);
        return screenToScrollPercentage;
    };

    const getScrollPositionPercentage = () => {
        const totalScrollWidth = refCardsContainer.current!.scrollWidth;
        const totalScrollLeft = refCardsContainer.current!.scrollLeft;
        const percentage = +((totalScrollLeft / totalScrollWidth) * 100).toFixed(2);
        return percentage;
    };

    // ------------------------------------------------------ //
    // -------- SCROLLING DRAGGING HANDLER FUNCTIONS -------- //
    // ------------------------------------------------------ //

    const handlerOnMouseDown = (e: React.MouseEvent) => {
        refCardsContainer.current!.style.scrollBehavior = 'auto'; // Just to make sure Scroll Behavior is set to Auto

        setIsDragging(true);
        setDragStart({startX: e.clientX, startTime: getTodaysDateMS()});
        setMouseX(e.clientX);
    };

    const handlerOnMouseUp = () => {
        setIsDragging(false);

        // ----------- SMOOTHNESS WHEN LET GO OF DRAG ----------- //
        const speed = getDragSpeed(prevDirection!);
        smoothingScrollEnd(speed);
    };

    const handlerOnMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setMouseX(e.clientX);

        if (mouseX < e.clientX) {
            //
            // ---------------- LEFT DIRECTION LOGIC ---------------- //

            shiftDirectionReset('left', e);
            const speed = getDragSpeed('left');
            const increment = 1 * BASIS_SPEED * speed;
            cardsContainer().scrollLeft -= increment;
            scrollBarThumb().style.left = `${getScrollPositionPercentage()}%`;

            //
        } else if (mouseX > e.clientX) {
            //
            // ---------------- RIGHT DIRECTION LOGIC --------------- //

            shiftDirectionReset('right', e);
            const speed = getDragSpeed('right');
            const increment = 1 * BASIS_SPEED * speed;
            cardsContainer().scrollLeft += increment;
            scrollBarThumb().style.left = `${getScrollPositionPercentage()}%`;
            //
        }
    };

    // ------------------------------------------------------ //
    // ----------- SCROLLING BAR HANDLER FUNCTIONS ---------- //
    // ------------------------------------------------------ //

    const handlerScrollArrow = (direction: 'left' | 'right') => {
        const screenWidth = window.innerWidth;
        const currScrollLeft = refCardsContainer.current!.scrollLeft;

        if (direction === 'left') smoothScrollTo(currScrollLeft - screenWidth * 0.9); //  Scroll Left
        else smoothScrollTo(currScrollLeft + screenWidth * 0.9); //                       Scroll Right
    };

    // ------------------------------------------------------ //
    // --------------- FETCHING DATA useEffect -------------- //
    // ----------------------------------------------------- //

    useEffect(() => {
        dataFetch({setDatabase, setLoading});
    }, []);

    // ----------- SCROLL ACTIVE EVENTS INTO VIEW ----------- //

    useEffect(() => {
        if (refCardsContainer.current === null || refScrollBar.current === null) return;
        const position = getScrollPositionPercentage();
        console.log(position);

        scrollBarThumb().style.width = `${getScreenToScrollPercentage()}%`;

        setTimeout(() => {
            divisor().scrollIntoView({behavior: 'smooth', block: 'end', inline: 'start'});
            scrollBarThumb().scrollIntoView({behavior: 'smooth', block: 'end'});
        }, 300);

        setTimeout(() => (scrollBarThumb().style.left = `${getScrollPositionPercentage()}%`), 1000);

        const totalEvents = database.length;
        const pastEvents = database.reduce((acc, currEvent) => {
            if (currEvent.isPastEvent) acc++;
            return acc;
        }, 0);
        const pastEventsPercentage = +((pastEvents / totalEvents) * 100).toFixed(0);

        refScrollBar.current!.style.background = `linear-gradient(to right, #eee ${pastEventsPercentage}%, #1cb9ed ${pastEventsPercentage}%)`;
    }, [database]);

    // ------------------------------------------------------ //
    // ------------------ COMPONENT RENDERS ----------------- //
    // ------------------------------------------------------ //

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div
                ref={refCardsContainer}
                className={ss.eventsCardsContainer}
                onMouseDown={handlerOnMouseDown}
                onMouseUp={handlerOnMouseUp}
                onMouseMove={handlerOnMouseMove}
                onMouseLeave={handlerOnMouseUp}
            >
                {database.map((event, index, arr) => {
                    const isLastPastEvent = event.isPastEvent && !arr[index + 1].isPastEvent;

                    if (isLastPastEvent) {
                        return (
                            <>
                                <Card key={event.title} event={event} />
                                <div className={ss.divisor} key={index} ref={refDivisor}></div>
                            </>
                        );
                    }

                    return <Card key={event.title} event={event} />;
                })}
            </div>
            <div className={ss.scrollBar}>
                <MdKeyboardArrowLeft className={ss.scrollBarArrows} onClick={() => handlerScrollArrow('left')} />
                <div className={ss.scrollBarGuide} ref={refScrollBar}>
                    <div className={ss.scrollBarThumb} ref={refScrollBarThumb}></div>
                </div>
                <MdKeyboardArrowRight className={ss.scrollBarArrows} onClick={() => handlerScrollArrow('right')} />
            </div>
        </>
    );
};

export default EventsCards;
