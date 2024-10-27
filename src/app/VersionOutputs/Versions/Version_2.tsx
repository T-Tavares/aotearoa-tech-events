import ss from './Version_2.module.scss';
import Header from '@/LayoutComponents/Header/v2/Header';
import Footer from '@/LayoutComponents/Footer/Footer';
import Content from '@/LayoutComponents/Content/v3/Content';

const Version: React.FC = () => {
    return (
        <div className={ss.layout}>
            <div className={ss.header}>
                <Header />
            </div>
            <div className={ss.content}>
                <Content />
            </div>
            <div className={ss.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default Version;
