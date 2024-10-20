import ss from '../PageLayout.module.scss';
import Header from '../../LayoutComponents/Header/Header';
import EventsCards from '../../Components/EventsCards/EventsCards';
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
