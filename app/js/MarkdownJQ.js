// JQuery version of the Markdown Preview to continue practicing jquery syntax and tools
defaultText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
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
marked.setOptions({
  breaks: true,
  gfm: true,
})

function start() {
  $("#editor").text(defaultText)
  updater()
}

function updater() {
  let value = marked.parse($("textarea").val())
  console.log(value)
  $("#preview").html(value)
}

function changeView(event) {
  $(event.target).toggleClass("fa-window-maximize fa-window-minimize")
  $(event.target).closest(".Wrapper").toggleClass("maxi")

  $(".header").each(function () {
    if ($(this).get(0) !== $(event.target).closest(".header").get(0)) {
      $(this).closest(".Wrapper").toggle()
    }
  })
}



$(document).ready(() => {
  start()
  $("#editor").keyup(updater)
  $(".window").click(changeView)
})

