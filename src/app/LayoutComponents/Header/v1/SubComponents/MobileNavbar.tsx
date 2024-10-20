'use client';

import ss from './MobileNavbar.module.scss';
import {useState} from 'react';

import {TiThMenu} from 'react-icons/ti';
import {IoClose} from 'react-icons/io5';
import {FaRegCalendarDays, FaRss} from 'react-icons/fa6';
import {LuLogIn} from 'react-icons/lu';

const MobileNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const openToggleCSS = isOpen ? ss.open : ss.close;

    return (
        <>
            <div onClick={toggleMenu} className={`${ss.openBtn} ${openToggleCSS}`}>
                <TiThMenu />
            </div>
            <div className={`${ss.navContainer} ${openToggleCSS}`}>
                <div onClick={toggleMenu} className={ss.closeBtn}>
                    <IoClose />
                </div>
                <nav>
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
            </div>
            <div onClick={toggleMenu} className={`${ss.backdrop} ${openToggleCSS}`}></div>
        </>
    );
};

export default MobileNavbar;
