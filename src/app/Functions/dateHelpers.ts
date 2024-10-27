export const getLocaleDateString = (millisecondsDate: number) => {
    const date = new Date(millisecondsDate);
    const options: Intl.DateTimeFormatOptions = {weekday: 'short', day: 'numeric', month: 'short', year: '2-digit'};
    return date.toLocaleDateString('en-GB', options);
};

export const getDay = (millisecondsDate: number) => {
    const date = new Date(millisecondsDate);
    return date.getDate();
};

export const getTodaysDateMS = () => new Date(2024, 9, 24).getTime();
// export const getTodaysDateMS = () => new Date().getTime();
