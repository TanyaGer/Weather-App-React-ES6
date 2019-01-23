export function getForecastDate (dateInfo) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec' ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    const date = dateInfo;
    const monthIndex = new Date(date).getMonth();
    const month = months[monthIndex];
    const dayIndex = new Date(date).getDay();
    const day = days[dayIndex];
    const dayNum = new Date(date).getDate();

    return {
        day: day,
        month: month,
        date: dayNum
    };
};