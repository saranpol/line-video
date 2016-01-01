var Nav = React.createClass({displayName: "Nav",
    render: function() {
        var p = this.props;
        var logoutButton;
        if(this.state.isLogin){
            logoutButton = (React.createElement("button", {onClick: this.clickLogout}, "Logout"));
        }else{
            logoutButton = ('');
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

                            React.createElement("button", {className: "btn btn-primary"}, "Logout")
                        )
                    )
                )
            )
        );
    }
});
