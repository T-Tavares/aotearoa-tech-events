import ss from './Navbar.module.scss';

import {FaRegCalendarDays, FaRss} from 'react-icons/fa6';
import {LuLogIn} from 'react-icons/lu';

const Navbar: React.FC = () => {
    return (
        <nav className={ss.nav}>
            <button>
                <FaRss />
                <p>News</p>
            </button>
            <button className={ss.active}>
                <FaRegCalendarDays />
                <p>Events</p>
            </button>
            <button>
                <LuLogIn />
                <p>Login</p>
            </button>
            <button className={ss.black}>
                <p>Sign up</p>
            </button>
        </nav>
    );
};

export default Navbar;
