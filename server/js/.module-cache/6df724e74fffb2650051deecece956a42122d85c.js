var Nav = React.createClass({displayName: "Nav",
    getInitialState: function() {
        var p = $.cookie("token");
        var FB_Name = $.cookie("FB_Name");
        var username = $.cookie("username");
        var isLogin = !(p === undefined || p === null);
        if(username === undefined || username === null){
            username = "";
        }
        return {
            isLogin: isLogin,
            FB_Name: FB_Name,
        };
    },
    clickLogout: function() {
        $.removeCookie("token");
        $.removeCookie("FB_userID");
        $.removeCookie("FB_Name");
        this.state.isLogin = false;
        this.setState();

        FB.logout(function(res) {
            window.location.href = "/";
        }.bind(this));
    },
    render: function() {
        var p = this.props;
        var logoutButton = ('');
        var facebookImg = ('');
        var profile_url;
        if(username != ""){
            profile_url = "/" + username;
        }else{
            profile_url = "/" + this.props.FB_userID;
        }

        if(this.state.isLogin){
            if(this.props.FB_userID != ""){
                var url = "https://graph.facebook.com/" + this.props.FB_userID + "/picture?width=42&height=42";
                facebookImg = (React.createElement("div", {className: "img-profile"}, React.createElement("a", {href: profile_url}, React.createElement("img", {src: url, className: "img-circle"}))))
            }
            logoutButton = (React.createElement("div", {className: "text-profile"}, React.createElement("span", {className: "username"}, this.state.FB_Name), React.createElement("br", null), React.createElement("a", {href: "#", onClick: this.clickLogout, className: "logout-link"}, "Logout")));
        }

        return (
            React.createElement("nav", {className: "navbar navbar-inverse navbar-static-top"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "navbar-header"}, 
                        React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar"}, 
                            React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
                            React.createElement("span", {className: "icon-bar"}), 
                            React.createElement("span", {className: "icon-bar"}), 
                            React.createElement("span", {className: "icon-bar"})
                        ), 
                        React.createElement("a", {className: "navbar-brand", href: "/"}, React.createElement("img", {className: "vertical-center", src: "/img/logo_nugtae.png"}))
                    ), 
                    React.createElement("div", {id: "navbar", className: "navbar-collapse collapse"}, 
                        React.createElement("div", {className: "navbar-form navbar-right"}, 
                            logoutButton, 
                            facebookImg
                        )
                    )
                )
            )
        );
    }
});
