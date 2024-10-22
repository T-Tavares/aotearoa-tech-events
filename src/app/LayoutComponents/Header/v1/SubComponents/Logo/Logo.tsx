import ss from './Logo.module.scss';
import {OpenSansBold} from '@/fonts';

const Logo: React.FC = () => {
    return (
        <div className={ss.logo}>
            <h1 className={OpenSansBold.className}>techstars_</h1>
            <h1 className={OpenSansBold.className}>Startup Digest</h1>
            <h1 className={OpenSansBold.className}>New Zealand</h1>
            <p>A newsletter covering all startup things in Aotearoa New Zealand</p>
        </div>
    );
};

export default Logo;
