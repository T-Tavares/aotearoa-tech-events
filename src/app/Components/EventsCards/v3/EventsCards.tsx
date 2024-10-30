'use client';

import ss from './EventsCards.module.scss';
import {useState, useRef, useEffect, Fragment} from 'react';
import Card from '@/components/Card/v4/Card';
import {Event} from '@/Types/Types';
import {getTodaysDateMS} from '@/Functions/dateHelpers';
import {dataFetch} from './DataFetch';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import Loading from '@/Components/Loading/Loading';
const EventsCards: React.FC<{monthGID: string}> = ({monthGID}) => {
    //
    const BASIS_SPEED = 10; //                                                     Basis Speed for Scrolling

    // ----------------------- useRefs ---------------------- //

    const refCardsContainer = useRef<HTMLDivElement>(null); //                     Ref to Cards Container
    const refDivisor = useRef<HTMLDivElement>(null); //                            Ref to Divisor
    const refScrollBar = useRef<HTMLDivElement>(null); //                          Ref to Scroll Bar
    const refScrollBarThumb = useRef<HTMLDivElement>(null); //                     Ref to Scroll Bar Thumb
    const refScrollBarContainer = useRef<HTMLDivElement>(null); //                 Ref to Scroll Bar Container

    // ------------------- DATABASE STATE ------------------- //

    const [database, setDatabase] = useState<Event[]>([]); //                      Database State
    const [loading, setLoading] = useState<boolean>(true); //                      Loading State

    // -------------- DRAGGING STATE VARIABLES -------------- //

    const [isDragging, setIsDragging] = useState(false); //                        Dragging State
    const [dragStart, setDragStart] = useState({startX: 0, startTime: 0}); //      Mouse Start Position and Time => For Speed Calculation
    const [mouseX, setMouseX] = useState(0); //                                    Current Mouse ClientX Position
    const [prevDirection, setPrevDirection] = useState<'left' | 'right'>(); //     State used to catch changing in direction

    // ------------------ REFS AS FUNCTIONS ----------------- //

    // Code was getting to wordy so I've created some functions
    // to return the refs as they are being used multiple times

    const cardsContainer = () => refCardsContainer.current!; //                    Cards Container Ref
    const divisor = () => refDivisor.current!; //                                  Divisor Ref - Dividing Past and Future Events
    const scrollBar = () => refScrollBar.current!; //                              Scroll Bar Ref
    const scrollBarThumb = () => refScrollBarThumb.current!; //                    Scroll Bar Thumb Ref
    const scrollBarContainer = () => refScrollBarContainer.current!; //            Scroll Bar Container Ref

    // ------------------------------------------------------ //
    // ------------------ HELPER FUNCTIONS ------------------ //
    // ------------------------------------------------------ //

    // -------------------- GETTER HELPERS ------------------ //

    const getDragSpeed = (direction: 'left' | 'right') => {
        //
        const {startTime, startX} = dragStart;
        const endTime = getTodaysDateMS();
        const distance = direction === 'left' ? mouseX - startX : startX - mouseX;
        const speed = distance / (endTime - startTime);
        return +speed.toFixed(2);
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

    const getElScrollingPosition100 = (el: HTMLElement) => {
        // const screenWidth = el.clientWidth;
        const leftOffset = el.scrollLeft;
        const scrollWidth = el.scrollWidth;

        // const scrollTotal = scrollWidth - screenWidth; //                       With Screen
        const scrollTotal = scrollWidth; //                                        Without Screen
        const scrollPercentage = +((leftOffset / scrollTotal) * 100).toFixed(0);

        return scrollPercentage;
    };

    const getScrollBarLimiter = () => {
        const scrollBarWidth = scrollBar().clientWidth;
        const scrollThumbWidth = scrollBarThumb().clientWidth;
        const widthLimiters = scrollThumbWidth;
        const limiterWidth = widthLimiters / 2;
        const limiterPercentage = +((limiterWidth / scrollBarWidth) * 100).toFixed(0);
        return limiterPercentage;
    };

    // --------------------- ( DESKTOP ) -------------------- //
    // -------------- SCROLLING HELPER FUNCTIONS ------------ //

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

        const scrollLeft = refCardsContainer.current!.scrollLeft;
        const scrollSmoothDistance = getScrollSmoothDistance(speed);

        refCardsContainer.current!.style.scrollBehavior = 'smooth';

        if (scrollSmoothDistance) {
            if (prevDirection === 'left') refCardsContainer.current!.scrollLeft = scrollLeft - scrollSmoothDistance!;
            else if (prevDirection === 'right')
                refCardsContainer.current!.scrollLeft = scrollLeft + scrollSmoothDistance!;
        }
    };

    const smoothingScrollThumbEnd = () => {
        //
        const scrollBarWidth = scrollBar().clientWidth;
        const limiter = scrollBarThumb().clientWidth / 2;
        const limiterPercentage = +((limiter / scrollBarWidth) * 100).toFixed(0);
        scrollBarThumb().style.left = `${getElScrollingPosition100(cardsContainer()) + limiterPercentage}%`;
    };

    // ------------------------------------------------------ //
    // --------------------- ( DESKTOP ) -------------------- //
    // ------------ DRAG SCROLL HANDLER FUNCTIONS ----------- //
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
        // Reading it simultaneously would cost too much performance
        // So I've added a delay so the Thumb can catch the final
        // position of the Cards Container Offset ScrollLeft
        setTimeout(() => smoothingScrollThumbEnd(), 500);
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
            const limiterPercentage = getScrollBarLimiter();
            const scrollPercentage = getElScrollingPosition100(cardsContainer());
            scrollBarThumb().style.left = `${scrollPercentage + limiterPercentage}%`;

            //
        } else if (mouseX > e.clientX) {
            //
            // ---------------- RIGHT DIRECTION LOGIC --------------- //

            shiftDirectionReset('right', e);
            const speed = getDragSpeed('right');
            const increment = 1 * BASIS_SPEED * speed;
            cardsContainer().scrollLeft += increment;
            const limiterPercentage = getScrollBarLimiter();
            const scrollPercentage = getElScrollingPosition100(cardsContainer());
            scrollBarThumb().style.left = `${scrollPercentage + limiterPercentage}%`;

            //
        }
    };

    // ------------------------------------------------------ //
    // --------------------- ( MOBILE ) --------------------- //
    // ----------- TOUCH SCROLL HANDLER FUNCTIONS ----------- //
    // ------------------------------------------------------ //

    const handlerOnTouchMove = () => smoothingScrollThumbEnd();

    const handlerOnTouchEnd = () => setTimeout(() => smoothingScrollThumbEnd(), 500);

    // ------------------------------------------------------ //
    // ------------- SCROLLBAR HANDLER FUNCTIONS ------------ //
    // ------------------------------------------------------ //

    const handlerScrollThumbMove = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = +e.target.value;
        const limiterPercentage = getScrollBarLimiter();

        /* 
            Notes:

            Taking advantage of the input range default value of 0 to 100 
            I'm using it as a percentage

            Because the Scroller slider is relative to the Screen against the scrolling width
            The scrollThumb size will always be different.
            On top of that the calculations are consideting the middle of the scrollerThumb as
            the pivot point. So I'm dividing the Thumb Width by 2 to get the limiter
        */
        cardsContainer().style.scrollBehavior = 'smooth';

        if (inputValue <= limiterPercentage) {
            scrollBarThumb().style.left = `${limiterPercentage}%`;
            e.target.value = `${limiterPercentage}`;
            cardsContainer().scrollLeft = 0;
            //
        } else if (inputValue >= 100 - limiterPercentage) {
            scrollBarThumb().style.left = `${100 - limiterPercentage}%`;
            e.target.value = `${100 - limiterPercentage}`;
            cardsContainer().scrollLeft = (cardsContainer().scrollWidth * inputValue) / 100;
            //
        } else {
            scrollBarThumb().style.left = `${inputValue}%`;
            cardsContainer().scrollLeft = (cardsContainer().scrollWidth * inputValue) / 100;
        }
        setTimeout(() => (cardsContainer().style.scrollBehavior = 'auto'), 500);
    };

    // ------------------------------------------------------ //
    // ----------- ARROWS SCROLL HANDLER FUNCTIONS ---------- //
    // ------------------------------------------------------ //

    const handlerArrowScroll = (direction: 'left' | 'right') => {
        const scrollLeftWidth = window.innerWidth * 0.8;
        cardsContainer().style.scrollBehavior = 'smooth';
        if (direction === 'right') cardsContainer().scrollLeft += scrollLeftWidth;
        if (direction === 'left') cardsContainer().scrollLeft -= scrollLeftWidth;
        setTimeout(() => {
            smoothingScrollThumbEnd();
            cardsContainer().style.scrollBehavior = 'smooth';
        }, 500);
    };

    // ------------------------------------------------------ //
    // --------------- FETCHING DATA useEffect -------------- //
    // ----------------------------------------------------- //

    useEffect(() => {
        setLoading(true);
        dataFetch({setDatabase, setLoading, monthGID});
    }, [monthGID]);

    // ------------------------------------------------------ //
    // ----------- STYLING FINE TUNNING USEEFFECT ----------- //
    // ------------------------------------------------------ //

    useEffect(() => {
        /* 
            Because The scrollbar sizing and styling is relative to the screen and the cards container
            Setting up it after all those components were mouted was causing some lag and visual bugs
    
            So I've decided to recalculate those values from the DB and Real DOM information
            I'm still checking for the ref's to be mounted to have it all synced, but I'm not using 
            the useEffect dependency array
        */
        //prettier-ignore
        const safeGuard = refCardsContainer.current === null || refScrollBar.current === null || refScrollBarThumb.current === null || refScrollBarContainer.current === null;
        /* 
            Divisor is not part of the safeGuard because if the whole month is available
            there will be no divisor and the scrollIntoView would throw an error
        */
        if (safeGuard) return;

        // ---- GATHERING INFO FROM DOM AND SOME OF THE REFS ---- //

        const clientWidth = document.body.clientWidth;

        const cardsContainerScrollWidth = cardsContainer().scrollWidth;
        const scrollBarWidth = scrollBar().clientWidth;

        const dbLength = database.length;
        const scrollBarBlockSize = +(scrollBarWidth / dbLength).toFixed(0);
        const pastEventsCount = database.reduce((acc, curr) => (curr.isPastEvent ? acc + 1 : acc), 0);

        // --------------- CALCULATING SCROLL BAR --------------- //
        // -------------- SIZE, POSITION AND STYLE -------------- //

        const scrollBarLeftPosition = scrollBarBlockSize * pastEventsCount;
        const scrollBarThumbPercentage = +((clientWidth / cardsContainerScrollWidth) * 100).toFixed(0);

        const scrollPercentage = +((scrollBarLeftPosition / scrollBarWidth) * 100).toFixed(0);

        const pastEventsPercentage = +((pastEventsCount / dbLength) * 100).toFixed(0);

        // ---------- ACCOUNTING FOR SCROLLER EXEPTIONS --------- //
        // Scroller Size edge case when the position goes over or belower the limiters

        if (scrollPercentage >= 100 - scrollBarThumbPercentage) {
            scrollBarThumb().style.left = `${100 - scrollBarThumbPercentage / 2}%`;
        } else if (scrollPercentage <= scrollBarThumbPercentage / 2) {
            scrollBarThumb().style.left = `${scrollBarThumbPercentage / 2}%`;
        } else {
            scrollBarThumb().style.left = `${scrollPercentage}%`;
        }
        // ------------------- SCROLLER WIDTH ------------------- //

        scrollBarThumb().style.width = `${scrollBarThumbPercentage}%`;

        // ------------ SLIDE TO NEAREST ACTIVE EVENT ----------- //

        if (refDivisor.current !== null) divisor().scrollIntoView({behavior: 'smooth', block: 'end', inline: 'start'});

        // -------------- GET SCROLL BAR ON SCREEN -------------- //

        scrollBarContainer().scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'});

        // ---------- SET COLOR OF PAST / ACTIVE EVENTS --------- //
        // ------------------ ON THE SCROLLBAR ------------------ //

        scrollBar().style.background = `linear-gradient(to right, #ccc ${pastEventsPercentage}%, #1cb9ed ${pastEventsPercentage}%)`;
    }, [database]);

    // ------------------------------------------------------ //
    // ------------------ COMPONENT RENDERS ----------------- //
    // ------------------------------------------------------ //

    if (loading) return <Loading message="Give us a second to find the coolest events for you" />;

    return (
        <>
            <div
                ref={refCardsContainer}
                className={ss.eventsCardsContainer}
                onMouseDown={handlerOnMouseDown}
                onMouseUp={handlerOnMouseUp}
                onMouseMove={handlerOnMouseMove}
                onMouseLeave={handlerOnMouseUp}
                onTouchMove={handlerOnTouchMove}
                onTouchEnd={handlerOnTouchEnd}
            >
                {database.map((event, index, arr) => {
                    const isLastPastEvent = event.isPastEvent && !arr[index + 1]?.isPastEvent;

                    if (isLastPastEvent) {
                        return (
                            <Fragment key={index}>
                                <Card key={event.title} event={event} />
                                <div className={ss.divisor} ref={refDivisor}></div>
                            </Fragment>
                        );
                    }

                    return <Card key={event.title} event={event} />;
                })}
            </div>
            <div className={ss.scrollBarContainer} ref={refScrollBarContainer}>
                <MdKeyboardArrowLeft className={ss.scrollBarArrows} onClick={() => handlerArrowScroll('left')} />
                <div className={ss.scrollBarActionContainer}>
                    <div className={ss.scrollBar} ref={refScrollBar}>
                        <input type="range" defaultValue={0} onChange={handlerScrollThumbMove} />
                        <div className={ss.scrolBarThumb} ref={refScrollBarThumb}></div>
                    </div>
                </div>
                <MdKeyboardArrowRight className={ss.scrollBarArrows} onClick={() => handlerArrowScroll('right')} />
            </div>
        </>
    );
};

export default EventsCards;
