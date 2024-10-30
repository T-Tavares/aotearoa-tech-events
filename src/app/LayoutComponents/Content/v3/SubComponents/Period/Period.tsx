import ss from './Period.module.scss';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import {Playfair} from '@/fonts';

interface MonthFirstLast {
    month: string;
    isFirstMonth: boolean;
    isLastMonth: boolean;
    handlerMonthChange: (option: 'next' | 'previous') => void;
}
const Period: React.FC<MonthFirstLast> = ({isFirstMonth, isLastMonth, handlerMonthChange, month}) => {
    return (
        <div className={ss.period}>
            <div className={ss.month}>
                <div>
                    {!isFirstMonth && <MdKeyboardArrowLeft onClick={() => handlerMonthChange('previous')} />}
                    <p className={Playfair.className}>{month}</p>
                    {!isLastMonth && <MdKeyboardArrowRight onClick={() => handlerMonthChange('next')} />}
                </div>
            </div>
        </div>
    );
};

export default Period;
