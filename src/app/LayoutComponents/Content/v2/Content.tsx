'use client';

import ss from './Content.module.scss';
import EventsCards from '@/Components/EventsCards/v2/EventsCards';

const Content: React.FC = () => {
    return (
        <div className={ss.content}>
            <h1>Events</h1>
            <EventsCards />
        </div>
    );
};
export default Content;
