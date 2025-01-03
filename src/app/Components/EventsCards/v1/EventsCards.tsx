'use client';

import ss from './EventsCards.module.scss';
// import {useState} from 'react';
// import type {Event} from '@/Types/Types';

// import Card from '@/components/Card/v2/Card';
// import Loading from '@/components/Loading/Loading';
// import Papa from 'papaparse';

const EventsCards: React.FC = () => {
    // const [database, setDatabase] = useState<Event[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);

    // const DB_URL =
    //     'https://docs.google.com/spreadsheets/d/e/2PACX-1vSP42ZXMPf2mwga0fC0VJuQKF3Dkt7IKJQgSp0z55Kc9FxFpbG5x-_onSwHn8mpMM3-sOP8IDz7W07X/pub?output=csv';

    // useEffect(() => {
    //     const fetchEvents = async (): Promise<void> => {
    //         const response = await fetch(DB_URL, {headers: {'content-type': 'text/csv'}});
    //         const data = await response.text();
    //         const parsedData = Papa.parse(data, {header: true}).data as Event[];

    //         const formatedData: Event[] = parsedData.slice(1).map((event: Event) => {
    //             const eventValues = Object.values(event);
    //             return {
    //                 date: eventValues[0],
    //                 region: eventValues[1],
    //                 title: eventValues[2],
    //                 blurb: eventValues[3],
    //                 type: eventValues[4],
    //                 organiserDetails: eventValues[5],
    //                 venue: eventValues[6],
    //                 ticketLink: eventValues[7],
    //                 notes: eventValues[8],
    //             } as Event;
    //         });
    //         setDatabase(formatedData);
    //         setLoading(false);
    //     };

    //     fetchEvents();
    // }, []);

    return (
        <div className={ss.eventsCardsContainer}>
            {/* {loading && <Loading message="We are searching for the Best Events, this wont take long" />}
            {database && database.map(event => <Card event={event} key={event.title} />)} */}
        </div>
    );
};

export default EventsCards;
