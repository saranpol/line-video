"use strict";

var Index = React.createClass({
    displayName: "Index",

    getInitialState: function getInitialState() {
        var p = $.cookie("token");
        var fid = $.cookie("FB_userID");
        if (fid === undefined || fid === null) fid = "";
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
            FB_login: false,
            FB_userID: fid,
            FB_accessToken: ""
        };
    },
    componentDidMount: function componentDidMount() {
        initFacebook(this.didInitFacebook);
    },
    setupLoginData: function setupLoginData(res) {
        this.state.FB_login = true;
        this.state.FB_userID = res.authResponse.userID;
        this.state.FB_accessToken = res.authResponse.accessToken;
        $.cookie("FB_accessToken", this.state.FB_accessToken, { expires: 100000 });
        this.forceUpdate();
        // console.log(this.state.FB_userID);
        // console.log(this.state.FB_accessToken);
    },
    didInitFacebook: function didInitFacebook() {
        FB.getLoginStatus((function (res) {
            if (res.status === 'connected') {
                this.setupLoginData(res);
                this.login(null);
            } else {
                this.state.FB_login = false;
            }
            this.forceUpdate();
        }).bind(this));
    },
    login: function login(success_callback) {
        var s = this.state;
        this.request = $.ajax({
            method: "POST",
            url: "login",
            data: {
                FB_userID: this.state.FB_userID,
                FB_accessToken: this.state.FB_accessToken
            },
            dataType: 'json',
            cache: false,
            success: (function (json) {
                if (json.Success == 1) {
                    $.cookie("token", json.Token, { expires: 100000 });
                    $.cookie("FB_userID", this.state.FB_userID, { expires: 100000 });
                    $.cookie("FB_Name", json.FB_Name, { expires: 100000 });
                    if (success_callback != null) success_callback();
                }
            }).bind(this),
            error: (function (xhr, status, err) {
                console.log(xhr, status, err.toString());
            }).bind(this)
        });
    },
    gotoMe: function gotoMe() {
        window.location.href = "/me";
    },
    clickFindPlayer: function clickFindPlayer() {
        window.location.href = "/search";
    },
    clickIAmPlayer: function clickIAmPlayer() {
        if (this.state.isLogin && this.state.FB_login) {
            this.gotoMe();
            return;
        }
        if (this.state.FB_login) {
            this.login((function () {
                this.gotoMe();
            }).bind(this));
            return;
        }
        FB.login((function (res) {
            if (res.status === 'connected') {
                this.setupLoginData(res);
                this.login((function () {
                    this.gotoMe();
                }).bind(this));
            } else if (res.status === 'not_authorized') {
                alert('Please log into this app.');
            } else {
                alert('Please log into Facebook.');
            }
        }).bind(this), { scope: 'public_profile,email,user_birthday' });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "bg-main" },
            React.createElement(Nav, { FB_userID: this.state.FB_userID }),
            React.createElement(
                "div",
                { className: "container full-height pad-nav" },
                React.createElement("div", { className: "row first-vcenter-row" }),
                React.createElement(
                    "div",
                    { className: "row text-center" },
                    React.createElement(
                        "div",
                        { className: "big-word" },
                        "\"มาเตะบอลกัน\""
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-5 text-center" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary btn-lg btn-tall btn-black", onClick: this.clickFindPlayer },
                            "หานักเตะ"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-2 text-center" },
                        React.createElement(
                            "div",
                            { className: "or-word" },
                            "หรือ"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-5 text-center" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary btn-lg btn-tall btn-red", onClick: this.clickIAmPlayer },
                            "สมัครเป็นนักเตะ"
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(Index, null), document.getElementById('content'));