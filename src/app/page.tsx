import ss from './page.module.scss';
import Header from './LayoutComponents/Header/Header';
import EventsCards from './Components/EventsCards/EventsCards';

export default function HomeLayout() {
    return (
        <div className={ss.layout}>
            <div className={ss.header}>
                <Header />
            </div>
            <div className={ss.content}>
                <EventsCards />
            </div>
            <div className={ss.footer}></div>
        </div>
    );
}
