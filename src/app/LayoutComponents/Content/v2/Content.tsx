'use client';

import ss from './Content.module.scss';
import EventsCards from '@/Components/EventsCards/v2/EventsCards';
// import Card from '@/Components/Card/v3/Card';

// const CardData = {
//     date: 'Wed 30th Oct, 5pm',
//     region: 'Aotearoa New Zealand',
//     title: 'Cryptocurrency NZ Meetup',
//     blurb: "Join one of Cryptocurrency NZ's 12 crypto Meetups across Aotearoa New Zealand; where you can find other Kiwis active in the currency wars of the 21st century: Wellington, Palmerston North, Invercargill, Hamilton, Rotorua, Dunedin, Hawke's Bay, Nelson, Auckland, Christchurch, Tauranga, Queenstown.",
//     type: 'In Person',
//     organiserDetails: 'Cryptocurrency NZ Meetup',
//     venue: 'Multiple locations across Aotearoa New Zealand',
//     ticketLink: 'https://cryptocurrency.org.nz/community/',
//     notes: '',
// };

const Content: React.FC = () => {
    return (
        <div className={ss.content}>
            <h1>Content</h1>
            {/* <Card event={CardData} />
            <Card event={CardData} />
            <Card event={CardData} />
            <Card event={CardData} />
            <Card event={CardData} />
            <Card event={CardData} /> */}
            <EventsCards />
        </div>
    );
};
export default Content;
