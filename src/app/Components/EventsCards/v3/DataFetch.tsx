import type {Event} from '@/Types/Types';
import Papa from 'papaparse';
import {fromStringToDate} from '@/Functions/fromStringToDate';

type FetchDispatchers = {
    setDatabase: React.Dispatch<React.SetStateAction<Event[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    monthGID: string;
};

const getDBLink = (monthGID: string) => {
    return `https://docs.google.com/spreadsheets/d/e/2PACX-1vSP42ZXMPf2mwga0fC0VJuQKF3Dkt7IKJQgSp0z55Kc9FxFpbG5x-_onSwHn8mpMM3-sOP8IDz7W07X/pub?gid=${monthGID}&single=true&output=csv`;
};

export const dataFetch = async ({setDatabase, setLoading, monthGID}: FetchDispatchers): Promise<void> => {
    const response = await fetch(getDBLink(monthGID), {headers: {'content-type': 'text/csv'}});
    const data = await response.text();
    const parsedData = Papa.parse(data, {header: true}).data as Event[];

    const formatedData: Event[] = parsedData.slice(1).map((event: Event) => {
        const eventValues = Object.values(event);

        const {startDate, endDate, startTime, endTime} = fromStringToDate(eventValues[0]);

        return {
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            // isPastEvent: startDate < new Date(2024, 9, 10).getTime(),
            isPastEvent: startDate < new Date().getTime(),
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
