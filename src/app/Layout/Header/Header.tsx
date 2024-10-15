import ss from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <div className={ss.header}>
            <div className={ss.logo}>
                <h1>techstars_</h1>
                <h1>Startup Digest</h1>
                <h1>New Zealand</h1>
                <p>A newsletter covering all startup things in Aotearoa New Zealand</p>
            </div>
            <nav className={ss.nav}>
                <button>News</button>
                <button className={ss.active}>Events</button>
                <button>Add</button>
                <button>Login</button>
                <button className={ss.black}>Sign up</button>
                <button>Feedback</button>
            </nav>
        </div>
    );
};

export default Header;
