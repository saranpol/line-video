var Search = React.createClass({displayName: "Search",
    getInitialState: function() {
        var p = $.cookie("token");
        var fid = $.cookie("FB_userID");
        if(fid === undefined || fid === null)
            fid = "";
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
            FB_login: false,
            FB_userID: fid,
            FB_accessToken: "",
            userList: [],
            locationStatus: "",
        };
    },
    componentDidMount: function() {
        this.updateData();
        initFacebook(this.didInitFacebook);
        setupMap(0, 0, this.onMapChange);
    },
    setupLoginData: function(res) {
        this.state.FB_login = true;
        this.state.FB_userID = res.authResponse.userID;
        this.state.FB_accessToken = res.authResponse.accessToken;
        this.setState();
    },
    didInitFacebook: function() {
        FB.getLoginStatus(function(res) {
            if (res.status === 'connected') {
                this.setupLoginData(res);
            } else {
                this.state.FB_login = false;
            }
            this.setState();
        }.bind(this));
    },
    updateData: function() {
        this.request = $.ajax({
            url: "search_user",
            data: {
            },
            dataType: 'json',
            cache: false,
            success: function(json) {
                console.log(json);
                this.state.userList = json.UserList;
                this.setState();
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this)
        });
    },
    updateCurrentLocation: function() {
        this.state.locationStatus = "กำลังค้นหา...";
        this.setState();
        navigator.geolocation.getCurrentPosition(function(position) {
            $('#locationPicker').locationpicker('location', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            this.state.locationStatus = "";
            this.setState();
            this.onMapChange(0,0,0);
        }.bind(this));
    },
    onMapChange: function(currentLocation, radius, isMarkerDropped) {
        // alert("Location changed. New location (" + currentLocation.latitude + ", " + currentLocation.longitude + ")");
        alert($("#inputLat") + " " + $("#inputLong"));
    },
    render: function() {
        var locationStyle = {width:"100%", height:"360px"};
        return (
            React.createElement("div", null, 
                React.createElement(Nav, {FB_userID: this.state.FB_userID}), 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "col-sm-12"}, 
                            React.createElement("label", null, "บริเวณที่สะดวกเตะบอล"), 
                            React.createElement("input", {type: "hidden", id: "inputAddress"}), 
                            React.createElement("input", {type: "hidden", id: "inputLat"}), 
                            React.createElement("input", {type: "hidden", id: "inputLong"}), 
                            React.createElement("br", null), "(คุณสามารถเลื่อนหมุดบนแผนที่เพื่อเปลี่ยนตำแหน่ง)", 
                            React.createElement("div", {id: "locationPicker", style: locationStyle}), 
                            React.createElement("button", {type: "button", onClick: this.updateCurrentLocation, className: "btn btn-default"}, "ไปยังตำแหน่งปัจจุบันของคุณ"), 
                            ' ', this.state.locationStatus, 
                            React.createElement("br", null), "(คุณอาจจะต้องกดอนุญาตให้ใช้ตำแหน่งด้วย)"
                        )
                    ), 
                    React.createElement(ResultList, {data: this.state.userList})
                )
            )
        );
    }
});








var ResultList = React.createClass({displayName: "ResultList",
    render: function() {
        var userNodes = this.props.data.map(function (user) { return (React.createElement(User, {user: user})); });
        return (React.createElement("div", null, userNodes));
    }
});

var User = React.createClass({displayName: "User",
    render: function() {
        var u = this.props.user;
        return (
            React.createElement("div", null, 
                "xx", u.FirstName
            )
        );
    }
});



React.render(
    React.createElement(Search, null),
    document.getElementById('content')
);




function setupMap(lat, lng, onchanged) {
    if(lat == 0 && lng == 0){
        lat = 13.746801859638278;
        lng = 100.53487491607666;
    }
    $('#locationPicker').locationpicker({
        location: {latitude:lat , longitude: lng},
        radius: 5000,
        zoom: 12,
        inputBinding: {
            latitudeInput: $('#inputLat'),
            longitudeInput: $('#inputLong'),
            locationNameInput: $('#inputAddress')
        },
        onchanged: onchanged
    });
}
