var Nav = React.createClass({displayName: "Nav",
    getInitialState: function() {
        var p = $.cookie("token");
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
        };
    },
    clickLogout: function() {
        $.removeCookie("token");
        this.state.isLogin = false;
        this.setState();

        FB.logout(function(res) {
        }.bind(this));
    },
    render: function() {
        var p = this.props;
        var logoutButton;
        var facebookImg;
        if(this.state.isLogin){
            alert(this.props.FB_userID);
            facebookImg = (React.createElement("img", {src: "https://graph.facebook.com/{this.props.FB_userID}/picture?width=32&height=32"}))
            logoutButton = (React.createElement("button", {onClick: this.clickLogout, className: "btn btn-primary"}, "Logout"));
        }else{
            logoutButton = ('');
            facebookImg = ('');
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
                        React.createElement("a", {className: "navbar-brand", href: "/"}, "Nugtae . นักเตะ")
                    ), 
                    React.createElement("div", {id: "navbar", className: "navbar-collapse collapse"}, 
                        React.createElement("div", {className: "navbar-form navbar-right"}, 
                            logoutButton
                        )
                    )
                )
            )
        );
    }
});
