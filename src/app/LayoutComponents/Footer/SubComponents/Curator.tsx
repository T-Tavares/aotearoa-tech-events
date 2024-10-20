import ss from './Curator.module.scss';

export interface Curator {
    name: string;
    socialLink: string;
    image?: string;
    titles: string;
    email: string;
}

const Curator: React.FC<{curator: Curator}> = ({curator}) => {
    const {name, socialLink, titles, email} = curator;

    return (
        <div className={ss.curator}>
            <div className={ss.profile}>
                <div className={ss.image}></div>
                <a href={socialLink} className={ss.link}>
                    {name}
                </a>
            </div>
            <div className={ss.info}>
                <p className={ss.titles}>{titles}</p>
                <p className={ss.email}>{email}</p>
            </div>
        </div>
    );
};
export default Curator;
