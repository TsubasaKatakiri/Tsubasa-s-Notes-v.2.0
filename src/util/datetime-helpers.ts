export const formatDate = (datetime : string) : string =>
    new Date(datetime).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'});

export const getISODate = () : string => {
    const date = new Date();

    return date.toISOString();
}
