export interface Event {
    date: string;
    region: string;
    title: string;
    blurb: string;
    type: string;
    organiserDetails: string;
    venue: string;
    ticketLink: string;
    notes: string;
}

export type Database = Event[] | null;
