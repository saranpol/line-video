var Index = React.createClass({displayName: "Index",
    getInitialState: function() {
        var p = $.cookie("password_md5");
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
            FB_login: false,
            FB_userID: "",
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
        // console.log(this.state.FB_userID);
        // console.log(this.state.FB_accessToken);
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
    clickLogout: function() {
        FB.logout(function(res) {
            this.state.FB_login = false;
            this.setState();
        }.bind(this));
    },
    login: function(success) {
        var s = this.state;
        this.request = $.ajax({
            url: "login",
            data: {
                FB_userID: this.state.FB_userID,
                FB_accessToken: this.state.FB_accessToken,
            },
            dataType: 'json',
            cache: false,
            success: function(json) {
                if(success != null)
                    success();
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this)
        });
    },
    gotoMe: function() {
        window.location.href = "/me";
    },
    clickFindPlayer: function() {
        window.location.href = "/search";
    },
    clickIAmPlayer: function() {
        if(this.state.isLogin){
            this.gotoMe();
            return;   
        }
        FB.login(function(res) {
            if (res.status === 'connected') {
                this.setupLoginData(res);
                this.state.FB_login = true;
                this.state.FB_userID = res.authResponse.userID;
                this.state.FB_accessToken = res.authResponse.accessToken;

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



