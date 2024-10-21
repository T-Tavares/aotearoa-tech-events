import ss from './Version_0.module.scss';
import Header from '@/LayoutComponents/Header/v0/Header';
import EventsCards from '@/Components/EventsCards/v1/EventsCards';
import Footer from '@/LayoutComponents/Footer/Footer';

const Version: React.FC = () => {
    return (
        <div className={ss.layout}>
            <div className={ss.header}>
                <Header />
            </div>
            <div className={ss.content}>
                <EventsCards />
            </div>
            <div className={ss.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default Version;
