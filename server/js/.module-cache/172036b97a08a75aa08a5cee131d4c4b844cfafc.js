var Me = React.createClass({displayName: "Me",
    getInitialState: function() {
        return {
            FB_login: false,
        };
    },
    componentDidMount: function() {
        initFacebook(this.didInitFacebook);
    },
    didInitFacebook: function() {
        FB.getLoginStatus(function(res) {
            if (res.status === 'connected') {
                this.state.FB_login = true;
            } else {
                this.state.FB_login = false;    
            }
            this.setState();
        }.bind(this));
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("button", {className: "btn btn-primary btn-lg", onClick: this.clickSave}, "SAVE")
            )
        );
    }
});



React.render(
    React.createElement(Me, null),
    document.getElementById('content')
);



