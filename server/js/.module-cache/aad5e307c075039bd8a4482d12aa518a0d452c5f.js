var Index = React.createClass({displayName: "Index",
    getInitialState: function() {
        var p = $.cookie("token");
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
            FB_login: false,
            FB_userID: $.cookie("FB_userID"),
            FB_accessToken: "",
        };
    },
    componentDidMount: function() {
        initFacebook(this.didInitFacebook);
    },
    setupLoginData: function(res) {
        this.state.FB_login = true;
        this.state.FB_userID = res.authResponse.userID;
        this.state.FB_accessToken = res.authResponse.accessToken;
        this.setState();
    },
    didInitFacebook: function() {
        FB.getLoginStatus(function(res) {
            if (res.status === 'connected') {
                this.setupLoginData(res);
                this.login(null);
            } else {
                this.state.FB_login = false;
            }
            this.setState();
        }.bind(this));
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement(Nav, {FB_userID: this.state.FB_userID}), 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-6"}, 
                            "uuu"
                        ), 
                        React.createElement("div", {className: "col-md-6"}, 
                            "xx"
                        )
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(Index, null),
    document.getElementById('content')
);
