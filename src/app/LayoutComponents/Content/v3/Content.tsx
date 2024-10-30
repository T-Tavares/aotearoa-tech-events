'use client';
import ss from './Content.module.scss';
import EventsCards from '@/Components/EventsCards/v3/EventsCards';
import FiltersBox from '@/Components/Filters/FiltersBox';
import Title from './SubComponents/Title/Title';
import Period from './SubComponents/Period/Period';
import {useEffect, useState} from 'react';

/* 
    Temporary solution for multiple months
    The idea probably will remain the same but 
    with cleaner code, possibly in a context
*/

const monthsGID = [
    {month: 'October', GID: '1118143081'},
    {month: 'November', GID: '1601903299'},
    {month: 'December', GID: '89010410'},
];

const Content: React.FC = () => {
    const [monthInfo, setMonthInfo] = useState(monthsGID[1]);
    const [isFirstMonth, setIsFirstMonth] = useState(false);
    const [isLastMonth, setIsLastMonth] = useState(false);

    const handlerMonthChange = (option: 'next' | 'previous') => {
        const currMonthIndex = monthsGID.findIndex(entry => entry.month === monthInfo.month);
        setMonthInfo(monthsGID[currMonthIndex + (option === 'next' ? 1 : -1)]);
    };

    // ----------- HANDLING FIRST AND LAST MONTHS ----------- //
    // --------------- OF OUR ARRAY OF MONTHS --------------- //

    useEffect(() => {
        const currMonthIndex = monthsGID.findIndex(entry => entry.month === monthInfo.month);
        const monthsArrLength = monthsGID.length;

        // Reset the state
        setIsFirstMonth(false);
        setIsLastMonth(false);

        if (currMonthIndex === 0) setIsFirstMonth(true);
        if (currMonthIndex === monthsArrLength - 1) setIsLastMonth(true);
    }, [monthInfo]);

    return (
        <div className={`${ss.content}`}>
            <Title title="Events" />
            <Period
                month={monthInfo.month}
                isFirstMonth={isFirstMonth}
                isLastMonth={isLastMonth}
                handlerMonthChange={handlerMonthChange}
            />
            <FiltersBox />
            <EventsCards monthGID={monthInfo.GID} />
        </div>
    );
};
export default Content;
