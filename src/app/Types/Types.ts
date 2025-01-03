export interface Event {
    startDate: number;
    endDate?: number;
    startTime?: number;
    endTime?: number;
    isPastEvent: boolean;
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
