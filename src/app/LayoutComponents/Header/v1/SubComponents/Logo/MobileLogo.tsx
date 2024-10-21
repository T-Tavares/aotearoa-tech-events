import ss from './MobileLogo.module.scss';

const MobileLogo: React.FC = () => {
    return (
        <div className={ss.logo}>
            <h1>NZ</h1>
            <h1>techstars_</h1>
            <h1>Startup Digest</h1>
            {/* <p>A newsletter covering all startup things in Aotearoa New Zealand</p> */}
        </div>
    );
};

export default MobileLogo;
