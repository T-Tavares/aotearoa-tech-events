import ss from './FiltersBox.module.scss';
import Filter from './SubComponents/Filter';

const FiltersBox: React.FC = () => {
    return (
        <div className={ss.filtersContainer}>
            <Filter />
            <Filter />
        </div>
    );
};

export default FiltersBox;
