import ss from './MobileLogo.module.scss';
import {OpenSansBold} from '@/fonts';

const MobileLogo: React.FC = () => {
    return (
        <div className={ss.logo}>
            <h1 className={OpenSansBold.className}>NZ</h1>
            <h1 className={OpenSansBold.className}>techstars_</h1>
            <h1 className={OpenSansBold.className}>Startup Digest</h1>
        </div>
    );
};

export default MobileLogo;
