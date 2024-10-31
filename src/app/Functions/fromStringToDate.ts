// ----------------------- HELPERS ---------------------- //

const refDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const refDaysEndings = ['th', 'st', 'nd', 'rd'];
const refMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// ------ CLEAN UP AND CONVERT DATE STRING TO ARRAY ----- //

const dateCleanupArraying = (dateStr: string): string[] => {
    return dateStr
        .replaceAll(',', ' ')
        .replaceAll(' am', 'am')
        .replaceAll(' pm', 'pm')
        .replaceAll('-', ' ')
        .replaceAll('/', ' ')
        .split(' ')
        .filter(data => data !== '')
        .filter(data => !refDays.some(day => data.toLowerCase().includes(day)));
};

// ----------- GET MONTH INDEX FROM DATE ARRAY ---------- //

const getMonthIndex = (dateArr: string[]): number => {
    return dateArr.reduce((acc: number, entry) => {
        const isMonth = refMonths.indexOf(entry.toLowerCase().slice(0, 3));
        if (isMonth !== -1) acc = isMonth;
        return acc;
    }, 0);
};

// --------------- GET START AND END DAYS --------------- //

type StartEndDays = {startDay: number | undefined; endDay: number | undefined};
const getStartEndDays = (dateArr: string[]): StartEndDays => {
    return dateArr.reduce(
        (acc, day, index, arr) => {
            //
            // ------- GET DAYS WITHOUTH ENDING - ST ND TR TH ------- //
            /* 
            Recogniser 'Day-Day, Month' pattern 
            */

            if (index === 0) {
                const isFirstDay = typeof +day === 'number' && !isNaN(+day);
                const isSecondDay = typeof +arr[index + 1] === 'number' && !isNaN(+arr[index + 1]);
                if (isFirstDay && isSecondDay) acc = {startDay: +day, endDay: +arr[index + 1]};
            }

            // ---- GET AND FORMAT DAYS WITH ENDING - ST ND TR TH --- //
            /* 
            The pattern for this resolution always would include only one day 
            */

            const isDay = refDaysEndings.some(refDay => day.includes(refDay));
            if (isDay) acc = {startDay: parseInt(day), endDay: undefined};

            // -------------- RETURN THE DAY ON THE ACC ------------- //

            return acc;
        },
        // --------------------- ACCUMULATOR -------------------- //
        {startDay: undefined, endDay: undefined} as StartEndDays
    );
};

// --------------- GET START AND END TIMES -------------- //

type StartEndTime = {startTime: number | undefined; endTime: number | undefined};
const getStartEndTime = (dateArr: string[]): StartEndTime => {
    const times = dateArr.reduce((acc, t: string) => {
        const isTime = t.includes('am') || t.includes('pm') || t.includes(':');

        if (isTime) {
            const time = parseInt(t);
            if (t.includes('am')) acc.push(time);
            if (t.includes('pm')) {
                if (time === 12) acc.push(time); // Midday
                else acc.push(time + 12);
            }
        }
        return acc;
    }, [] as number[]);

    return {startTime: times[0], endTime: times[1]};
};

// ---------------------- GET YEAR ---------------------- //

const getYear = (monthIndex: number): number => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const isNextYear = monthIndex < currentMonth;
    return isNextYear ? currentYear + 1 : currentYear;
};

// ------------------------------------------------------ //
// ----------------- DATE FORMATTER MAIN ---------------- //
// ------------------------------------------------------ //

interface DateObject {
    startDate: number;
    startTime?: number;
    endDate?: number;
    endTime?: number;
}
export const fromStringToDate = (dateStr: string): DateObject => {
    const dateArray = dateCleanupArraying(dateStr);
    const monthIndex = getMonthIndex(dateArray);
    const {startDay, endDay} = getStartEndDays(dateArray);
    const {startTime, endTime} = getStartEndTime(dateArray);
    const year = getYear(monthIndex);

    let date: number;
    let endDate: number | undefined;

    // --------- GET MILLISECONDS FOR STARTING DATE --------- //

    if (startTime === undefined) date = new Date(year, monthIndex, startDay).getTime();
    else date = new Date(year, monthIndex, startDay, startTime).getTime();

    // ------ GET MILLISECONDS FOR ENDING DATE - IF ANY ----- //

    if (endDay) endDate = new Date(year, monthIndex, endDay).getTime();
    else endDate = undefined;

    return {startDate: date, endDate: endDate, startTime, endTime};
};

// ------------------------------------------------------ //
// ------------------------------------------------------ //
// ------------------------------------------------------ //

// ------------------ FROM 24 TO AM/PM ------------------ //

export const from24ToAmPm = (time: number): string => {
    if (time === 12) return '12 pm';
    if (time === 24) return '12 am';
    if (time < 12) return `${time} am`;
    return `${time - 12} pm`;
};
