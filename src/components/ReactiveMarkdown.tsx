import React from 'react'
import VideoPlayer from './VideoPlayer';

interface props {
    text: string;
}


const lineRules: [RegExp, string | ((props: any[]) => React.JSX.Element)][] = [
    [/</g, "&lt;"],
    [/>/g, "&gt;"],

    [ /[\[]VIDEO\]([^\n]+)/g, ([source]) => <VideoPlayer src={source} /> ],
    [ /[\[]IMAGE\]([^\n]+)/g, ([source]) => <img src={source} alt='image' title='image' /> ],

    [/\*\*\s?([^\n]+)\*\*/g,([text]) => <b>{text}</b>],
    [/\*\s?([^\n]+)\*/g,    ([text]) => <i>{text}</i>],
    [/__([^_]+)__/g,        ([text]) => <b>{text}</b>],
    [/_([^_`]+)_/g,         ([text]) => <i>{text}</i>],

    //links
    [ /\[([^\]]+)\]\(([^)]+)\)/g, ([link, text]) => <a href={link} style={{color:'#2A5DB0', textDecoration: 'none'}}>{text}</a>, ],

    //Lists
    [/([^\n]+)(\+|\*)([^\n]+)/g, ([text]) => <ul><li>{text}</li></ul>],

    //header rules
    [/#{6}\s?([^\n]+)/g, ([text]) => <h6>{text}</h6>],
    [/#{5}\s?([^\n]+)/g, ([text]) => <h5>{text}</h5>],
    [/#{4}\s?([^\n]+)/g, ([text]) => <h4>{text}</h4>],
    [/#{3}\s?([^\n]+)/g, ([text]) => <h3>{text}</h3>],
    [/#{2}\s?([^\n]+)/g, ([text]) => <h2>{text}</h2>],
    [/#{1}\s?([^\n]+)/g, ([text]) => <h1>{text}</h1>],
]

export default function ReactiveMarkdown({ text }: props) {
    console.log(text)

    let code = false
    let codeBuffer: React.JSX.Element[] = []
    return String(text).split('\n').map((item, index) => {
        if (item == "") return <br key={index} />
        if (item == '```') {
            code = !code
            item = item.replace(/```/g,"")
        }

        if ( code == false && codeBuffer.length > 0) {
            const bufferCopy = [...codeBuffer]
            codeBuffer = []
            return <code key={index}>
                {bufferCopy.map(buffer => buffer)}
            </code>
        }

        let returnItem: React.JSX.Element | undefined = undefined;
        for (let i = 0; i < lineRules.length; i++) {
            const [rule, template] = lineRules[i];
            if (code == true) {
                codeBuffer.push(<p>{item}</p>)
                break;
            }

            if (rule.test(item) == true) {

                const matches: string[] = [];
                item.replace(rule, "$1;;;$2;;;$3;;;$4;;;$5;;;$6").split(";;;").map(target => {
                    if (target.includes("$") == false) matches.push(target)
                })

                if (typeof template != "string") {
                    returnItem = template(matches)
                    break 
                }
                returnItem = <p>{item.replace(rule, template)}</p>

                break
            }

            // console.log(rule, item)
            returnItem = <p>{item}</p>
        }

        if (returnItem) {
            return <div style={{display:'contents'}} key={index} >
                {returnItem}
            </div> 
        }

        // console.log(item, "AA")
    })
}
