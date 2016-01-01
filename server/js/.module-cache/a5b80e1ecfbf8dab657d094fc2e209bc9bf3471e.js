var FB_login = false;

function checkFBLogin() {
    FB.getLoginStatus(function(res) {
        if (res.status === 'connected') {
            FB_login = true;
        } else {
            FB_login = false;    
        }
    });
}

function initFacebook(didFacebookInit) {
    window.fbAsyncInit = function() {
        FB.init({
            //appId      : '1630915767191046', // Real
            appId      : '1630920700523886', // Dev
            cookie     : true,
            xfbml      : true,
            version    : 'v2.4'
        });

        didFacebookInit();
    };

}


(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk')
);

