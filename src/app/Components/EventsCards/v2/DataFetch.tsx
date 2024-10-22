import type {Event} from '@/Types/Types';
import Papa from 'papaparse';

type FetchDispatchers = {
    setDatabase: React.Dispatch<React.SetStateAction<Event[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DB_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSP42ZXMPf2mwga0fC0VJuQKF3Dkt7IKJQgSp0z55Kc9FxFpbG5x-_onSwHn8mpMM3-sOP8IDz7W07X/pub?output=csv';

export const dataFetch = async ({setDatabase, setLoading}: FetchDispatchers): Promise<void> => {
    const response = await fetch(DB_URL, {headers: {'content-type': 'text/csv'}});
    const data = await response.text();
    const parsedData = Papa.parse(data, {header: true}).data as Event[];

    const formatedData: Event[] = parsedData.slice(1).map((event: Event) => {
        const eventValues = Object.values(event);
        return {
            date: eventValues[0],
            region: eventValues[1],
            title: eventValues[2],
            blurb: eventValues[3],
            type: eventValues[4],
            organiserDetails: eventValues[5],
            venue: eventValues[6],
            ticketLink: eventValues[7],
            notes: eventValues[8],
        } as Event;
    });

    setDatabase(formatedData);
    setLoading(false);
};
