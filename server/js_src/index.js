var Index = React.createClass({
    getInitialState: function() {
        return {
            XX: "",
        };
    },
    render: function() {
        var title = Title;
        var subTitle = SubTitle;
        var video_url = "https://www.youtube.com/embed/" + VID;
        return (
            <div>
                <iframe className="youtube-iframe" src={video_url} frameBorder="0" allowFullScreen></iframe>
                <div className="des1">{title} {subTitle}</div>
            </div>
        );
    }
});

ReactDOM.render(
    <Index />,
    document.getElementById('content')
);
