var Index = React.createClass({displayName: "Index",
    getInitialState: function() {
        // var p = $.cookie("password_md5");
        // var isLogin = !(p === undefined || p === null);
        return {data: [],
            fb_login: false,
        };
    },
    loadProductsFromServer: function() {
    },
    componentDidMount: function() {
        //this.loadProductsFromServer();
    },
    clickLogout: function() {
        FB.logout(function(res) {
        });
    },
    clickFindPlayer: function() {

    },
    getFBDataAndRegister: function() {
        FB.api('/me?fields=name,email', function(res) {
            console.log('Successful login for: ' + JSON.stringify(res));
        });
    },
    checkFBLogin: function() {
        FB.getLoginStatus(function(res) {
            if (res.status === 'connected') {
                this.state.fb_login = true;
            } else {
                this.state.fb_login = false;    
            }
        }.bind(this));
    },
    clickIAmPlayer: function() {
        if(this.state.fb_login){
            this.getFBDataAndRegister();
            return;   
        }
        FB.login(function(res) {
            if (res.status === 'connected') {
                this.state.fb_login = true;
                this.getFBDataAndRegister();
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
                React.createElement("button", {onClick: this.clickFindPlayer}, "Find Player"), 
                React.createElement("button", {onClick: this.clickIAmPlayer}, "I am Player"), 
                React.createElement("button", {onClick: this.clickLogout}, "Logout")
            )
        );
    }
});










window.fbAsyncInit = function() {
    FB.init({
        //appId      : '1630915767191046', // Real
        appId      : '1630920700523886', // Dev
        cookie     : true,
        xfbml      : true,
        version    : 'v2.4'
    });

    // checkLoginState();
    Index.checkFBLogin();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk')
);












React.render(
    React.createElement(Index, null),
    document.getElementById('content')
);



