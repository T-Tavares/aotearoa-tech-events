import ss from './Logo.module.scss';

const Logo: React.FC = () => {
    return (
        <div className={ss.logo}>
            <h1>techstars_</h1>
            <h1>Startup Digest</h1>
            <h1>New Zealand</h1>
            <p>A newsletter covering all startup things in Aotearoa New Zealand</p>
        </div>
    );
};

export default Logo;
