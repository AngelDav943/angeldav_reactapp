const markdownRules = [
    [/</g, "&lt;"],
    [/>/g, "&gt;"],

    //code snippets
    [
        /```([^`+]+)```/g,
        // /```(?:\n*)([^`+]+)(?:\n*)```/g,
        "<code>$1</code>",
    ],

    //Video
    [
        /[\[]VIDEO\]([^\n]+)/g,
        "<video autoPlay muted playsInline loop controls> <source src='$1' type='video/mp4' /> </video>",
    ],

    //Image
    [
        /[\[]IMAGE\]([^\n]+)/g,
        "<img src='$1' alt='image' title='image' />",
    ],

    //bold, italics and paragragh rules
    [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
    [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
    [/__([^_]+)__/g, "<b>$1</b>"],
    [/_([^_`]+)_/g, "<i>$1</i>"],
    
    //Lists
    [/([^\n]+)(\+|\*|\-)([^\n]+)/g, "<ul><li>$3</li></ul>"],
    
    //links
    [
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>',
    ],
    
    //header rules
    [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
    [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
    [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
    [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
    [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
    [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],
    
    //highlights
    [
        /(`)(\s?[^\n,]+\s?)(`)/g,
        "<a style='background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;'>$2</a>",
    ],

    [/([^\n]+\n?)/g, "<p>$1</p>"],
    
    // HTML Misc
    // [/<(\w+)\s*><(\w+)\s*>(.*)<\/\2><\/\1>/g, "<$2>$3</$2>"],
    [/<(\w+)\s*>(?:\n*)<(\/?\w+)\s*>(?:\n*)<\/\1>/g, "<$2>"],
    [/<(\w+)\s*>(?:\n*)<(\w+)\s*>(.*)(?:\n*)<\/\2>(?:\n*)<\/\1>/g, "<$2>$3</$2>"],
    [/<(\w+)\s*>(?:\s*)<\/\1>/g, ""],
];

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
    },

    parseMarkdown(body) {
        if (body == null) return;

        let html = body
        markdownRules.forEach(([rule, template]) => {
            html = html.replace(rule, template)
        })

        return html
    }
}