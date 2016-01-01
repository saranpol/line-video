var Index = React.createClass({displayName: "Index",
  getInitialState: function() {
    // var p = $.cookie("password_md5");
    // var isLogin = !(p === undefined || p === null);
    return {data: [],
    };
  },
  loadProductsFromServer: function() {
    // if(!this.state.isLogin)
    //   return;
    // var s = this.state;
    // this.request = $.ajax({
    //   url: "products",
    //   data: {offset: s.page*s.limit, 
    //     limit: s.limit,
    //     q: s.q,
    //     mode: s.mode,
    //     password_md5: $.cookie("password_md5")
    //   },
    //   dataType: 'json',
    //   cache: false,
    //   success: function(json) {
    //     if(json.Data != null)
    //       this.setState({data: json.Data,
    //         total: json.Total,
    //         total_page: Math.ceil(json.Total/this.state.limit)
    //       });
    //     else {
    //       this.setState({data: []});
    //       console.log(json)
    //     }
          
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.log(xhr, status, err.toString());
    //   }.bind(this)
    // });
  },
  componentDidMount: function() {
    //this.loadProductsFromServer();
  },
  render: function() {
    return (
      React.createElement("div", null, 
      "Test"
      )
    );
  }
});






function statusChangeCallback(res) {
    console.log('statusChangeCallback');
    console.log(res);
    if (res.status === 'connected') {
        testAPI();
    } else if (res.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
        document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(res) {
        statusChangeCallback(res);
    });
}


window.fbAsyncInit = function() {
    FB.init({
        //appId      : '1630915767191046', // Real
        appId      : '1630920700523886', // Dev
        cookie     : true,
        xfbml      : true,
        version    : 'v2.4'
    });

    checkLoginState();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk')
);

function clickLogin() {
    FB.login(function(res) {
        statusChangeCallback(res);
    }, { scope: 'public_profile,email' });
}

function clickLogout() {
    FB.logout(function(res) {
    });
}

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=name,email', function(res) {
        console.log('Successful login for: ' + JSON.stringify(res));
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + res.name + ' ' + res.email + '!';
    });
}








React.render(
  React.createElement(Index, null),
  document.getElementById('content')
);



