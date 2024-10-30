import ss from './Card.module.scss';
import type {Event} from '@/Types/Types';

const Card: React.FC<{event: Event}> = ({event}) => {
    console.log(event);

    // const {blurb, date, title, organiserDetails, type} = event;
    const {blurb, title, organiserDetails, type} = event;

    return (
        <div className={ss.card}>
            <div className={ss.header}>
                <p className={ss.title}>{title}</p>
                <p className={ss.organiser}>{organiserDetails}</p>
            </div>
            {/* <p className={ss.date}>{date}</p> */}
            <p className={ss.address}>{type}</p>
            <div className={ss.blurb}>{blurb}</div>
        </div>
    );
};

export default Card;
