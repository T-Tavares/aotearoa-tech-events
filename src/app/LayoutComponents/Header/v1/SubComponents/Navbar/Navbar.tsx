import ss from './Navbar.module.scss';

import {FaRegCalendarDays, FaRss} from 'react-icons/fa6';
import {LuLogIn} from 'react-icons/lu';

import {OpenSans} from '@/fonts';

const Navbar: React.FC = () => {
    return (
        <nav className={`${ss.nav} `}>
            <button>
                <FaRss />
                <p className={OpenSans.className}>News</p>
            </button>
            <button className={ss.active}>
                <FaRegCalendarDays />
                <p className={OpenSans.className}>Events</p>
            </button>
            <button>
                <LuLogIn />
                <p className={OpenSans.className}>Login</p>
            </button>
            <button className={ss.black}>
                <p className={OpenSans.className}>Sign up</p>
            </button>
        </nav>
    );
};

export default Navbar;
