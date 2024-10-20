import ss from './Footer.module.scss';
import Curator from './SubComponents/Curator';
import type {Curator as TCurator} from './SubComponents/Curator';

const paulSpence: TCurator = {
    name: 'Paul Spence',
    email: 'enpaul.spence@gmail.com',
    socialLink: 'https://www.linkedin.com/in/enpaulspence/',
    titles: 'Business lecturer @ Lincoln University. Previously cofounder @ iwantmyname, Creative Forest. Working on Genius ReFi',
};

const pauliSosa: TCurator = {
    name: 'Pauli Sosa',
    email: 'paulainessosa@gmail.com',
    socialLink: 'https://www.linkedin.com/in/pauli-sosa/',
    titles: `Co-Founder @ MUV Talks Head of Community & Events @ Caffeine Daily`,
};

const Footer: React.FC = () => {
    return (
        <div className={ss.footer}>
            <div className={ss.curation}>
                <p className={ss.curationTitle}>This Techstars Start up Digest newsletter is curated by:</p>
                <Curator curator={paulSpence} />
                <Curator curator={pauliSosa} />
            </div>
            <div className={ss.subscribe}>
                <p>Subscribe to stay in the loop. Issue on Tuesdays.</p>
                <input type="text" placeholder="your@email.com" />
                <button>Subscribe</button>
            </div>
            <div className={ss.copyright}>
                <p>Copyright © 2024 Techstars Startup Digest New Zealand, All rights reserved</p>
                <p>228 Park Avenue S, PMB 99696, New York, NY 10003-1502</p>
            </div>
        </div>
    );
};

export default Footer;
