var Me = React.createClass({displayName: "Me",
    getInitialState: function() {
        // var p = $.cookie("password_md5");
        // var isLogin = !(p === undefined || p === null);
        return {data: []
        };
    },
    loadProductsFromServer: function() {
    },
    componentDidMount: function() {
        //this.loadProductsFromServer();
    },
    gotoMe: function() {
        window.location.href = "/me";
        // FB.api('/me?fields=name,email', function(res) {
        //     console.log('Successful login for: ' + JSON.stringify(res));
        //     window.location.href = "/me";
        // });
    },
    clickFindPlayer: function() {
        window.location.href = "/search";
    },
    clickSave: function() {
        if(FB_login){
            this.gotoMe();
            return;   
        }
        FB.login(function(res) {
            if (res.status === 'connected') {
                FB_login = true;
                this.gotoMe();
            } else if (res.status === 'not_authorized') {
                alert('Please log into this app.');
            } else {
                alert('Please log into Facebook.');
            }
        }.bind(this), { scope: 'public_profile,email' });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("button", {className: "btn btn-primary btn-lg", onClick: this.clickSave}, "SAVE")
            )
        );
    }
});



React.render(
    React.createElement(Me, null),
    document.getElementById('content')
);



