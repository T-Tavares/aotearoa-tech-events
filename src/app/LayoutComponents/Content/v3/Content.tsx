'use client';
import ss from './Content.module.scss';
import EventsCards from '@/Components/EventsCards/v3/EventsCards';
import FiltersBox from '@/Components/Filters/FiltersBox';
import Title from './SubComponents/Title/Title';
import Period from './SubComponents/Period/Period';

const Content: React.FC = () => {
    return (
        <div className={`${ss.content}`}>
            <Title title="Events" />
            <Period />
            <FiltersBox />
            <EventsCards />
        </div>
    );
};
export default Content;
