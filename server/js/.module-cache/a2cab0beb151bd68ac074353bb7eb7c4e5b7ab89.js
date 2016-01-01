var Index = React.createClass({displayName: "Index",
    getInitialState: function() {
        var p = $.cookie("token");
        var fid = $.cookie("FB_userID");
        if(fid === undefined || fid === null)
            fid = "";
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
            FB_login: false,
            FB_userID: fid,
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
    login: function(success_callback) {
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
                if(json.Success == 1){
                    $.cookie("token", json.Token, { expires: 100000 });
                    $.cookie("FB_userID", this.state.FB_userID, { expires: 100000 });
                    if(success_callback != null)
                        success_callback();
                }
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
        if(this.state.isLogin && this.state.FB_login){
            this.gotoMe();
            return;
        }
        if(this.state.FB_login){
            this.login(function(){this.gotoMe();}.bind(this));
            return;
        }
        FB.login(function(res) {
            if (res.status === 'connected') {
                this.setupLoginData(res);
                this.login(function(){this.gotoMe();}.bind(this));
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
                React.createElement(Nav, {FB_userID: this.state.FB_userID}), 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "row text-center"}, 
                        React.createElement("h1", null, "ฉันต้องการ")
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-6 text-center"}, 
                            React.createElement("button", {className: "btn btn-primary btn-lg btn-tall", onClick: this.clickFindPlayer}, "หานักเตะร่วมทีม")
                        ), 
                        React.createElement("div", {className: "col-md-6 text-center"}, 
                            React.createElement("button", {className: "btn btn-primary btn-lg btn-tall", onClick: this.clickIAmPlayer}, "ให้คนชวนเล่นฟุตบอล")
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
