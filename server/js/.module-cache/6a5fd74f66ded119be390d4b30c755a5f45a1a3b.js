var Nav = React.createClass({displayName: "Nav",
    render: function() {
        var p = this.props;
        return (
            React.createElement("nav", {className: "navbar navbar-inverse navbar-fixed-top"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "navbar-header"}, 
                        React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar"}, 
                            React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
                            React.createElement("span", {className: "icon-bar"}), 
                            React.createElement("span", {className: "icon-bar"}), 
                            React.createElement("span", {className: "icon-bar"})
                        ), 
                        React.createElement("a", {className: "navbar-brand", href: "#"}, "Project name")
                    ), 
                React.createElement("div", {id: "navbar", className: "navbar-collapse collapse"}, 
                    React.createElement("form", {className: "navbar-form navbar-right"}, 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("input", {type: "text", placeholder: "Email", className: "form-control"})
                        ), 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("input", {type: "password", placeholder: "Password", className: "form-control"})
                        ), 
                        React.createElement("button", {type: "submit", className: "btn btn-success"}, "Sign in")
                    )
                )
              )
            )
        );
    }
});
