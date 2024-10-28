import ss from './Title.module.scss';
import {PlaywriteUDTrad} from '@/fonts';

const Title: React.FC<{title: string}> = ({title}) => {
    return (
        <div className={ss.title}>
            <h1 className={PlaywriteUDTrad.className}>{title}</h1>
        </div>
    );
};

export default Title;
