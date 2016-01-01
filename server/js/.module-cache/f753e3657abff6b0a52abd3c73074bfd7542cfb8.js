'use strict';

var appId = '1630915767191046'; // Real
if (window.location.port == 8080) {
    appId = '1630920700523886'; // Dev
}

function initFacebook(didFacebookInit) {
    window.fbAsyncInit = function () {
        FB.init({
            appId: appId,
            cookie: true,
            xfbml: true,
            version: 'v2.4'
        });

        didFacebookInit();
    };
}

(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');