'use client';

import ss from './MobileNavbar.module.scss';
import {useState} from 'react';

import {TiThMenu} from 'react-icons/ti';
import {IoClose} from 'react-icons/io5';
import {FaRegCalendarDays, FaRss} from 'react-icons/fa6';
import {LuLogIn} from 'react-icons/lu';

import {OpenSans} from '@/fonts';

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
            </div>
            <div onClick={toggleMenu} className={`${ss.backdrop} ${openToggleCSS}`}></div>
        </>
    );
};

export default MobileNavbar;
