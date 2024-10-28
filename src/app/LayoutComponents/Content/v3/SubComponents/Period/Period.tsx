import ss from './Period.module.scss';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import {Playfair} from '@/fonts';

const Period: React.FC = () => {
    return (
        <div className={ss.period}>
            <div className={ss.month}>
                <div>
                    <MdKeyboardArrowLeft />
                    <p className={Playfair.className}>October</p>
                    <MdKeyboardArrowRight />
                </div>
            </div>
        </div>
    );
};

export default Period;
