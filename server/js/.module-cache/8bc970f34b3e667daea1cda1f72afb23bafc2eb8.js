var Index = React.createClass({displayName: "Index",
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
    clickLogout: function() {
        FB.logout(function(res) {
            this.state.FB_login = false;
            this.setState();
        }.bind(this));
    },
    gotoMe: function() {
        window.location.href = "/me";
    },
    clickFindPlayer: function() {
        window.location.href = "/search";
    },
    clickIAmPlayer: function() {
        if(this.state.FB_login){
            this.gotoMe();
            return;   
        }
        FB.login(function(res) {
            if (res.status === 'connected') {
                this.state.FB_login = true;
                this.gotoMe();
            } else if (res.status === 'not_authorized') {
                alert('Please log into this app.');
            } else {
                alert('Please log into Facebook.');
            }
        }.bind(this), { scope: 'public_profile,email,user_birthday' });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "nugtae.com"), 
                React.createElement("h3", null, "นักเตะ"), 
                React.createElement("button", {className: "btn btn-primary btn-lg", onClick: this.clickFindPlayer}, "ฉันต้องการหานักเตะร่วมทีม"), 
                ' ', 
                React.createElement("button", {className: "btn btn-primary btn-lg", onClick: this.clickIAmPlayer}, "ฉันต้องการให้คนชวนเล่นฟุตบอล"), 
                ' '
                
            )
        );
    }
    //<button onClick={this.clickLogout}>Logout</button>
});

React.render(
    React.createElement(Index, null),
    document.getElementById('content')
);



