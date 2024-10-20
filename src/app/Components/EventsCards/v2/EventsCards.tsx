'use client';

import ss from './EventsCards.module.scss';
import {useState, useEffect} from 'react';
import type {Event} from '@/Types/Types';
import {dataFetch} from './DataFetch';

import Card from '@/components/Card/v3/Card';
import Loading from '@/components/Loading/Loading';

const EventsCards: React.FC = () => {
    const [database, setDatabase] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dataFetch({setDatabase, setLoading});
    }, []);

    return (
        <div className={ss.eventsCardsContainer}>
            {loading && <Loading message="We are searching for the Best Events, this wont take long" />}
            {database && database.map(event => <Card event={event} key={event.title} />)}
        </div>
    );
};

export default EventsCards;
