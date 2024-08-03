const dateFormatter = (date, format) => {
    let day = "" + date.getDate();
    let month = "" + (date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = "" + date.getHours();
    let minutes = "" + date.getMinutes();
    let seconds = "" + date.getSeconds();
    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;
    if (hours.length < 2) hours = "0" + hours;
    if (minutes.length < 2) minutes = "0" + minutes;
    if (seconds.length < 2) seconds = "0" + seconds;
    return format.replace("YYYY", year).replace("MM", month).replace("DD", day).replace("HH", hours).replace("mm", minutes).replace("ss", seconds);
};

export default dateFormatter;
