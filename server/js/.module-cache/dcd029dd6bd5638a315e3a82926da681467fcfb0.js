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
        });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("form", {className: "form-horizontal"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "inputEmail3", className: "col-sm-2 control-label"}, "Email"), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("input", {ref: "", type: "email", className: "form-control", id: "inputEmail3", placeholder: "Email"})
                        )
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "inputPassword3", className: "col-sm-2 control-label"}, "Password"), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("input", {type: "password", className: "form-control", id: "inputPassword3", placeholder: "Password"})
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

React.render(
    React.createElement(Me, null),
    document.getElementById('content')
);



