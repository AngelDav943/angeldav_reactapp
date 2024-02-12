export default {
    timeFromTimestamp(timestamp, hidetime) {
        if (isNaN(parseInt(timestamp))) return "";
    
        const date = new Date(parseInt(timestamp));
        var time = {
            "day": date.getDate(),
            "month": date.getMonth() + 1,
            "year": date.getFullYear(),
            "hours": date.getHours(),
            "minutes": date.getMinutes()
        }
    
        for (var t in time) {
            if (time[t] < 10) time[t] = `0${time[t]}`
        }
    
        var timeStampCon = time.day + '/' + time.month + '/' + time.year;
        if (hidetime != true) timeStampCon += " " + time.hours + ':' + time.minutes
    
        return timeStampCon;
    }
}