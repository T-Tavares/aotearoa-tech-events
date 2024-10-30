import ss from './Loading.module.scss';

const Loading: React.FC<{message?: string}> = ({message}) => {
    return (
        <>
            <div className={ss.loadingContainer}>
                <div className={ss.loader}></div>
                <p className={ss.message}>{message}</p>
            </div>
        </>
    );
};
export default Loading;
