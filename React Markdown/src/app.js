import React from 'react'
import { useState, useEffect } from 'react'
import { marked } from 'marked'

marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function (code, lang) {
        if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
        } else {
            return code;
        }
    }
})

export default function Markup() {
    const [editorText, setEditorText] = useState(defaultText)
    const [minMax, setMinMax] = useState('0') // making cases 0: both 1: editor 2:previewer

    function handleTextChange(e) {
        setEditorText(e.target.value)
    }
    function windowChanger(parent) {
        let setting = minMax === '0' && parent == 'Editor' ? '1' : minMax == 0 && parent == 'Previewer' ? '2' : '0'
        setMinMax(setting)
    }
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <>
            {(minMax === '0' || minMax === '1') && <div id='Editor'>
                <Header parent={'Editor'} window={windowChanger} minMax={minMax} />
                <Display parent={'Editor'} text={editorText} onTextChange={handleTextChange} />
            </div>}
            {(minMax === '0' || minMax === '2') && <div id='Previewer'>
                <Header parent={'Previewer'} window={windowChanger} minMax={minMax} />
                <Display text={editorText} />

            </div>}
        </>
    )
}

function Header({ parent, window, minMax }) {
    let icon = parent == 'Editor' ? <i className="fa-regular fa-keyboard"></i> : <i className="fa-regular fa-file-code"></i>
    let windowIcon = minMax !== '0' ? 'fa-regular window fa-window-minimize' : 'fa-regular window fa-window-maximize'
    return (
        <div className='header'>
            <span className='heading'>{icon} {parent}</span>
            <span className='minMax'><i onClick={() => window(parent)} className={windowIcon}></i></span>
        </div>
    )
}

function Display({ parent, text, onTextChange }) {
    const renderedMarkdown = marked(text)

    const getMarkDownText = () => {
        return { __html: renderedMarkdown }
    }

    if (parent == 'Editor') {
        return (
            <textarea onChange={(e) => onTextChange(e)} className='display' defaultValue={text}>
            </textarea>
        )
    } else {
        return (
            <div className='display' dangerouslySetInnerHTML={getMarkDownText()}></div>
        )
    }

}


let defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\` javascript
\/\/ this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == \'\`\`\`\' && lastLine == \'\`\`\`\') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

