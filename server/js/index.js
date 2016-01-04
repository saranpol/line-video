"use strict";

var Index = React.createClass({
    displayName: "Index",

    getInitialState: function getInitialState() {
        return {
            XX: ""
        };
    },
    render: function render() {
        var title = Title;
        var subTitle = SubTitle;
        var video_url = "https://www.youtube.com/embed/" + VID;
        return React.createElement(
            "div",
            null,
            React.createElement("iframe", { className: "youtube-iframe", src: video_url, frameBorder: "0", allowFullScreen: true }),
            React.createElement(
                "div",
                { className: "des1" },
                title,
                " ",
                subTitle
            )
        );
    }
});

ReactDOM.render(React.createElement(Index, null), document.getElementById('content'));