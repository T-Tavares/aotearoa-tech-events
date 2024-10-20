import ss from './Loading.module.scss';

const Loading: React.FC<{message?: string}> = ({message}) => {
    return (
        <>
            <div className={ss.loadingContainer}>
                <div className={ss.loadingWheel}></div>
                <p>Loading</p>
            </div>
            <p>{message}</p>
        </>
    );
};
export default Loading;
