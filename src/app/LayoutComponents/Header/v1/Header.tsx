import ss from './Header.module.scss';

import MobileNavbar from './SubComponents/Navbar/MobileNavbar';
import Navbar from './SubComponents/Navbar/Navbar';
import Logo from './SubComponents/Logo/Logo';
import MobileLogo from './SubComponents/Logo/MobileLogo';

const Header: React.FC = () => {
    return (
        <div className={ss.header}>
            <Logo />
            <MobileLogo />
            <Navbar />
            <MobileNavbar />
        </div>
    );
};

export default Header;
