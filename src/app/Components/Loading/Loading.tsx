import ss from './Loading.module.scss';

const Loading: React.FC<{message?: string}> = ({message}) => {
    return (
        <>
            <div className={ss.loadingContainer}>
                <div className={ss.loading}>
                    <div className={ss.loadingWheel}></div>
                    <p>Loading</p>
                </div>
                <p className={ss.message}>{message}</p>
            </div>
        </>
    );
};
export default Loading;
