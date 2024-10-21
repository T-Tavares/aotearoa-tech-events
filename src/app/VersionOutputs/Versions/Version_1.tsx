import ss from './Version_1.module.scss';
import Header from '@/LayoutComponents/Header/v1/Header';
import Footer from '@/LayoutComponents/Footer/Footer';
import Content from '@/LayoutComponents/Content/v2/Content';

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
