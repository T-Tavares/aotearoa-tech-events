'use client';

import ss from './EventsCards.module.scss';
import {useState, useRef, useEffect, useCallback} from 'react';
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

    const refScrollBar = useRef<HTMLInputElement>(null); //                     Ref to ScrollBar
    const refScrollBarThumb = useRef<HTMLInputElement>(null); //                     Ref to ScrollBar

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
    const scrolBarThumb = () => refScrollBarThumb.current!;
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

    const getScrollSmoothDistance = (speed: number) => {
        const screenWidth = window.innerWidth;

        let scrollSmoothDistance;

        if (speed < 1) scrollSmoothDistance = 0;
        else if (speed >= 1 && speed < 2) scrollSmoothDistance = screenWidth / 4;
        else if (speed >= 2 && speed < 3) scrollSmoothDistance = screenWidth / 2;
        else scrollSmoothDistance = screenWidth;

        return scrollSmoothDistance;
    };

    const smoothingScrollEnd = (speed?: number) => {
        if (!speed) return;

        const scrollLeft = refCardsContainer.current!.scrollLeft;
        const scrollSmoothDistance = getScrollSmoothDistance(speed);

        refCardsContainer.current!.style.scrollBehavior = 'smooth';

        if (scrollSmoothDistance) {
            if (prevDirection === 'left') refCardsContainer.current!.scrollLeft = scrollLeft - scrollSmoothDistance!;
            else if (prevDirection === 'right')
                refCardsContainer.current!.scrollLeft = scrollLeft + scrollSmoothDistance!;
        }
    };

    const smoothScrollTo = (position: number) => {
        refCardsContainer.current!.style.scrollBehavior = 'smooth';
        refCardsContainer.current!.scrollLeft = position;
        setTimeout(() => {
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

    const getScrollPosition = (el: HTMLDivElement) => {
        const totalScrollWidth = el.scrollWidth;
        const totalScrollLeft = el.scrollLeft;
        const percentage = +((totalScrollLeft / totalScrollWidth) * 100).toFixed(2);

        return percentage;
    };

    // ------------------------------------------------------ //
    // -------- SCROLLING DRAGGING HANDLER FUNCTIONS -------- //
    // ------------------------------------------------------ //

    const handlerOnMouseDown = (e: React.MouseEvent) => {
        cardsContainer().style.scrollBehavior = 'auto'; // Just to make sure Scroll Behavior is set to Auto
        setIsDragging(true);
        setDragStart({startX: e.clientX, startTime: getTodaysDateMS()});
        setMouseX(e.clientX);
    };

    const handlerOnMouseUp = () => {
        setIsDragging(false);

        // ----------- SMOOTHNESS WHEN LET GO OF DRAG ----------- //
        const speed = getDragSpeed(prevDirection!);
        smoothingScrollEnd(speed);
        const scrollSmoothDistance = getScrollSmoothDistance(speed);

        const scrollDistancePercentage = +((scrollSmoothDistance / cardsContainer().scrollWidth) * 100).toFixed();
        setTimeout(() => (scrollBar().value = `${getScrollPosition(cardsContainer())}`), 400);
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
            scrollBar().value = `${getScrollPosition(cardsContainer())}`;

            //
        } else if (mouseX > e.clientX) {
            //
            // ---------------- RIGHT DIRECTION LOGIC --------------- //

            shiftDirectionReset('right', e);
            const speed = getDragSpeed('right');
            const increment = 1 * BASIS_SPEED * speed;
            cardsContainer().scrollLeft += increment;
            scrollBar().value = `${getScrollPosition(cardsContainer())}`;

            //
        }
    };

    // ------------------------------------------------------ //
    // ----------- SCROLLING BAR HANDLER FUNCTIONS ---------- //
    // ------------------------------------------------------ //

    const handlerScrollBar = (e: React.ChangeEvent<HTMLInputElement>) => {
        cardsContainer().style.scrollBehavior = 'auto';
        const scrollOffset = +((cardsContainer().scrollWidth * +e.target.value) / 100).toFixed(0);
        cardsContainer().scrollLeft = scrollOffset;
        scrolBarThumb().style.left = `${e.target.value}%`;
    };

    // ------------------------------------------------------ //
    // --------------- FETCHING DATA useEffect -------------- //
    // ----------------------------------------------------- //

    useEffect(() => {
        dataFetch({setDatabase, setLoading});
    }, []);

    // ----------- SCROLL ACTIVE EVENTS INTO VIEW ----------- //

    useEffect(() => {
        if (divisor() === null) return;
        console.log('Divisor:', divisor());
        setTimeout(() => divisor().scrollIntoView({behavior: 'smooth', block: 'end', inline: 'start'}), 300);
    }, [refDivisor.current]);

    // useEffect(() => {}, []);

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
            <div className={ss.scrollBarContainer}>
                <MdKeyboardArrowLeft className={ss.scrollBarArrows} />
                <div className={ss.scrollBar}>
                    <input type="range" ref={refScrollBar} onChange={handlerScrollBar} />
                    <div className={ss.scrolBarThumb} ref={refScrollBarThumb}></div>
                </div>
                <MdKeyboardArrowRight className={ss.scrollBarArrows} />
            </div>
        </>
    );
};

export default EventsCards;
