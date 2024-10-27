'use client';
import {PlaywriteUDTrad} from '@/fonts';
import ss from './Content.module.scss';
import EventsCards from '@/Components/EventsCards/v3/EventsCards';

const Content: React.FC = () => {
    return (
        <div className={`${ss.content}`}>
            <h1 className={PlaywriteUDTrad.className}>Events</h1>
            <EventsCards />
        </div>
    );
};
export default Content;
