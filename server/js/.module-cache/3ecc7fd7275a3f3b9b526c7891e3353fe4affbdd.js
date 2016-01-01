var Me = React.createClass({displayName: "Me",
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
            if(this.state.FB_login){
                this.updateMeData();
            }
        }.bind(this));
    },
    updateMeData: function() {
        FB.api('/me?fields=first_name,last_name,email,birthday', function(res) {
            console.log('Successful login for: ' + JSON.stringify(res));
            this.refs.inputEmail.setState({"inputText":res.email});

        }.bind(this));
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("form", {className: "form-horizontal"}, 
                    React.createElement(TextInput, {ref: "inputFirstName", type: "text", placeholder: "Email"}), 
                    React.createElement(TextInput, {ref: "inputLastName", type: "text", placeholder: "Email"}), 
                    React.createElement(TextInput, {ref: "inputEmail", type: "email", placeholder: "Email"}), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {className: "col-sm-2 control-label"}, "Password"), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("input", {ref: "inputPassword", type: "password", className: "form-control", placeholder: "Password"})
                        )
                    ), 
                  
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                            React.createElement("div", {className: "checkbox"}, 
                                React.createElement("label", null, 
                                    React.createElement("input", {type: "checkbox"}), " Remember me"
                                )
                            )
                        )
                    ), 
                  
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                            React.createElement("button", {type: "submit", className: "btn btn-primary btn-lg"}, "Save")
                        )
                    )
                )
            )
        );
    }
});

var TextInput = React.createClass({displayName: "TextInput",
    getInitialState: function() {
        return {
            inputText: "",
        };
    },
    render: function() {
        var p = this.props;
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Email"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("input", {type: p.type, className: "form-control", placeholder: p.placeholder, value: this.state.inputText})
                )
            )
        );
    }
});

React.render(
    React.createElement(Me, null),
    document.getElementById('content')
);



