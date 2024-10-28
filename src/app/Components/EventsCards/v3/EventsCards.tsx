'use client';

import ss from './EventsCards.module.scss';
import {useState, useRef} from 'react';
import Card from '@/components/Card/v4/Card';
import {getTodaysDateMS} from '@/Functions/dateHelpers';

const EventsCards: React.FC = () => {
    // -------------- DRAGGING STATE VARIABLES -------------- //

    const BASIS_SPEED = 10; //                                                  Basis Speed for Scrolling

    const cardsContainerRef = useRef<HTMLDivElement>(null); //                  Ref to Cards Container
    const [isDragging, setIsDragging] = useState(false); //                     Dragging State
    const [dragStart, setDragStart] = useState({startX: 0, startTime: 0}); //   Mouse Start Position and Time => For Speed Calculation
    const [mouseX, setMouseX] = useState(0); //                                 Current Mouse ClientX Position
    const [prevDirection, setPrevDirection] = useState<'left' | 'right'>(); //  State used to catch changing in direction

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
        const scrollLeft = cardsContainerRef.current!.scrollLeft;

        let scrollSmoothDistance;
        if (speed < 1) scrollSmoothDistance = 0;
        else if (speed >= 1 && speed < 2) scrollSmoothDistance = screenWidth / 4;
        else if (speed >= 2 && speed < 3) scrollSmoothDistance = screenWidth / 2;
        else scrollSmoothDistance = screenWidth;

        cardsContainerRef.current!.style.scrollBehavior = 'smooth';

        if (scrollSmoothDistance) {
            if (prevDirection === 'left') cardsContainerRef.current!.scrollLeft = scrollLeft - scrollSmoothDistance!;
            else if (prevDirection === 'right')
                cardsContainerRef.current!.scrollLeft = scrollLeft + scrollSmoothDistance!;
        }

        setTimeout(() => (cardsContainerRef.current!.style.scrollBehavior = 'auto'), 500);
    };

    // ------------------------------------------------------ //
    // ------------- DRAGGING HANDLER FUNCTIONS ------------- //
    // ------------------------------------------------------ //

    const handlerOnMouseDown = (e: React.MouseEvent) => {
        cardsContainerRef.current!.style.scrollBehavior = 'auto'; // Just to make sure Scroll Behavior is set to Auto

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
            cardsContainerRef.current!.scrollLeft -= 1 * BASIS_SPEED * speed;
            //
        } else if (mouseX > e.clientX) {
            //
            // ---------------- RIGHT DIRECTION LOGIC --------------- //

            shiftDirectionReset('right', e);
            const speed = getDragSpeed('right');
            cardsContainerRef.current!.scrollLeft += 1 * BASIS_SPEED * speed;
            //
        }
    };

    return (
        <div
            className={ss.eventsCardsContainer}
            ref={cardsContainerRef}
            onMouseDown={handlerOnMouseDown}
            onMouseUp={handlerOnMouseUp}
            onMouseMove={handlerOnMouseMove}
            onMouseLeave={handlerOnMouseUp}
        >
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
    );
};

export default EventsCards;
