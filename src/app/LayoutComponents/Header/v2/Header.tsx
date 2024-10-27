import ss from './Header.module.scss';
import {Karla, KarlaBold} from '@/Fonts/fonts';

const Header: React.FC = () => {
    return (
        <div className={ss.header}>
            <div className={ss.logo}>
                <div>
                    <h2 className={Karla.className}>tech</h2>
                    <h2 className={Karla.className}>events</h2>
                </div>
                <h1 className={KarlaBold.className}>NZ</h1>
            </div>
            <p>Start-up & Tech Networking in New Zealand</p>
        </div>
    );
};

export default Header;
