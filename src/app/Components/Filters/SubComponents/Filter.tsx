import ss from './Filter.module.scss';
import {GoTriangleDown} from 'react-icons/go';

const Filter: React.FC = () => {
    return (
        <div className={ss.filter}>
            <p>Type:</p>
            <div className={ss.option}>
                <p>Some type</p>
                <div className={ss.arrowDown}>
                    <GoTriangleDown />
                </div>
            </div>
        </div>
    );
};

export default Filter;
