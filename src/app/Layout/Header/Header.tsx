import ss from './Header.module.scss';

import MobileNavbar from './SubComponents/MobileNavbar';
import Navbar from './SubComponents/Navbar';

const Header: React.FC = () => {
    return (
        <div className={ss.header}>
            <div className={ss.logo}>
                <h1>techstars_</h1>
                <h1>Startup Digest</h1>
                <h1>New Zealand</h1>
                <p>A newsletter covering all startup things in Aotearoa New Zealand</p>
            </div>
            <Navbar />
            <MobileNavbar />
        </div>
    );
};

export default Header;
