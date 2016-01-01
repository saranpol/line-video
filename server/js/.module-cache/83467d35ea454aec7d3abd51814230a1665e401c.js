"use strict";

var Nav = React.createClass({
    displayName: "Nav",

    getInitialState: function getInitialState() {
        var p = $.cookie("token");
        var FB_Name = $.cookie("FB_Name");
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
            FB_Name: FB_Name
        };
    },
    clickLogout: function clickLogout() {
        $.removeCookie("token");
        $.removeCookie("FB_userID");
        $.removeCookie("FB_Name");
        this.state.isLogin = false;
        this.forceUpdate();

        FB.logout((function (res) {
            window.location.href = "/";
        }).bind(this));
    },
    render: function render() {
        var p = this.props;
        var logoutButton = '';
        var facebookImg = '';
        if (this.state.isLogin) {
            if (this.props.FB_userID != "") {
                var url = "https://graph.facebook.com/" + this.props.FB_userID + "/picture?width=42&height=42";
                facebookImg = React.createElement(
                    "div",
                    { className: "img-profile" },
                    React.createElement(
                        "a",
                        { href: "/me" },
                        React.createElement("img", { src: url, className: "img-circle" })
                    )
                );
            }
            logoutButton = React.createElement(
                "div",
                { className: "text-profile" },
                React.createElement(
                    "a",
                    { href: "/me" },
                    React.createElement(
                        "div",
                        { className: "username" },
                        this.state.FB_Name
                    )
                ),
                React.createElement(
                    "a",
                    { href: "#", onClick: this.clickLogout, className: "logout-link" },
                    "Logout"
                )
            );
        }
        var containerClass = "container";
        if (this.props.fullWidth) {
            containerClass = "container-fullwidth";
        }

        return React.createElement(
            "nav",
            { className: "navbar navbar-inverse navbar-fixed-top" },
            React.createElement(
                "div",
                { className: containerClass },
                React.createElement(
                    "div",
                    { className: "navbar-header" },
                    React.createElement(
                        "button",
                        { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar" },
                        React.createElement(
                            "span",
                            { className: "sr-only" },
                            "Toggle navigation"
                        ),
                        React.createElement("span", { className: "icon-bar" }),
                        React.createElement("span", { className: "icon-bar" }),
                        React.createElement("span", { className: "icon-bar" })
                    ),
                    React.createElement(
                        "a",
                        { className: "navbar-brand", href: "/" },
                        React.createElement("img", { className: "logo-vertical", src: "/img/logo_nugtae.png" })
                    )
                ),
                React.createElement(
                    "div",
                    { id: "navbar", className: "navbar-collapse collapse" },
                    React.createElement(
                        "div",
                        { className: "navbar-form navbar-right" },
                        logoutButton,
                        facebookImg
                    )
                )
            )
        );
    }
});