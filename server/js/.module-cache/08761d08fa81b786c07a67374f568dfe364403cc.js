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
            lat: 13.746801859638278,
            long: 100.53487491607666,
        };
    },
    componentDidMount: function() {
        this.updateData();
        initFacebook(this.didInitFacebook);
        setupMap(this.state.lat, this.state.long, this.onMapChange);
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
        alert(this.state.lat);
        this.request = $.ajax({
            url: "search_user",
            data: {
                lat: this.state.lat,
                long: this.state.long,
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
            this.state.lat = position.coords.latitude;
            this.state.long = position.coords.longitude;
            this.setState();
            this.updateData();
        }.bind(this));
    },
    onMapChange: function(currentLocation, radius, isMarkerDropped) {
        this.state.lat = currentLocation.latitude;
        this.state.long = currentLocation.longitude;
        this.updateData();
    },
    render: function() {
        var locationStyle = {width:"100%", height:"360px"};
        return (
            React.createElement("div", null, 
                React.createElement(Nav, {FB_userID: this.state.FB_userID}), 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-6"}, 
                            React.createElement("label", null, "เลื่อนหมุดไปยังตำแหน่งที่ใกล้กับสนามฟุตบอลเพื่อค้นหานักเตะบริเวณใกล้เคียง"), 
                            React.createElement("input", {type: "hidden", id: "inputAddress"}), 
                            React.createElement("input", {type: "hidden", id: "inputLat"}), 
                            React.createElement("input", {type: "hidden", id: "inputLong"}), 
                            React.createElement("div", {id: "locationPicker", style: locationStyle}), 
                            React.createElement("button", {type: "button", onClick: this.updateCurrentLocation, className: "btn btn-default"}, "ไปยังตำแหน่งปัจจุบันของคุณ"), 
                            ' ', this.state.locationStatus, 
                            React.createElement("br", null), "(คุณอาจจะต้องกดอนุญาตให้ใช้ตำแหน่งด้วย)"
                        ), 
                        React.createElement("div", {className: "col-md-6"}, 
                            React.createElement("label", null, "เลือกวันและเวลาเพื่อค้นหานักเตะที่ว่างเวลานั้น")
                        )
                    ), 
                    React.createElement(ResultList, {data: this.state.userList, search: this})
                )
            )
        );
    }
});








var ResultList = React.createClass({displayName: "ResultList",
    render: function() {
        var userNodes = this.props.data.map(function (user) { return (React.createElement(User, {user: user, search: this.props.search})); }.bind(this));
        return (React.createElement("div", null, userNodes));
    }
});

var User = React.createClass({displayName: "User",
    deg2rad: function (deg) {
        return deg * (Math.PI/180);
    },
    calDistance: function(lat1,lon1){
        var lat2 = this.props.search.state.lat;
        var lon2 = this.props.search.state.long;
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    },
    render: function() {
        var u = this.props.user;
        var url = "/";
        if(u.Username != ""){
            url += u.Username;
        }else{
            url += u.FB_userID;
        }
        var image_url;
        var img_style = {width:"80px"}
        if(u.ImageURL==""){
            image_url = "/img/test.jpg";
        }else{
            image_url = u.ImageURL + "=s80";
        }
        var distance = String.format("%.2f", this.calDistance(u.Location.Lat,u.Location.Lng));
        return (
            React.createElement("div", null, 
                React.createElement("img", {style: img_style, src: image_url}), 
                u.FirstName, " ", u.LastName, " (", u.NickName, ")" + ' ' +
                "อีเมล์:", u.Email, " Line ID:", u.LineID, 
                "Link:", url, " Mobile: ", u.Mobile, 
                "อายุ :", u.Birthday, 
                "ระยะทาง : ", " กม."

            )
        );
    }
});


// PosGoal bool
//
// PosCenterBack bool
// PosSweeper bool
// PosFullBackL bool
// PosFullBackR bool
// PosWingBackL bool
// PosWingBackR bool
//
// PosCenterMid bool
// PosDefMid bool
// PosAttackMid bool
// PosWideMid bool
//
// PosCenterForward bool
// PosSecondStriker bool
// PosWingL bool
// PosWingR bool
//
// CostFreeHelpField bool
// CostFreeNoHelpField bool
// CostHour bool
// CostHourBaht int
//
// ExpNearHome bool
// ExpSchool bool
// ExpUniversity bool
// ExpProvince bool
// ExpTour bool
// ExpClub bool
// ExpNation bool
//
// FieldGrass bool
// FieldFakeGrass bool
// FieldHard bool
// FieldSand bool
// FieldClay bool
// FieldRain bool
//
// Size11 bool
// Size7_9 bool
// Size3_6 bool
// Size11up bool
//
// TimeNormalDay9 bool
// TimeNormalDay10 bool
// TimeNormalDay11 bool
// TimeNormalDay12 bool
// TimeNormalDay13 bool
// TimeNormalDay14 bool
// TimeNormalDay15 bool
// TimeNormalDay16 bool
// TimeNormalDay17 bool
// TimeNormalDay18 bool
// TimeNormalDay19 bool
// TimeNormalDay20 bool
// TimeNormalDay21 bool
// TimeNormalDay22 bool
// TimeNormalDay23 bool
// TimeNormalDay0 bool
// TimeNormalDay1 bool
// TimeNormalDay2 bool
// TimeNormalDay3 bool
//
// TimeSatDay9 bool
// TimeSatDay10 bool
// TimeSatDay11 bool
// TimeSatDay12 bool
// TimeSatDay13 bool
// TimeSatDay14 bool
// TimeSatDay15 bool
// TimeSatDay16 bool
// TimeSatDay17 bool
// TimeSatDay18 bool
// TimeSatDay19 bool
// TimeSatDay20 bool
// TimeSatDay21 bool
// TimeSatDay22 bool
// TimeSatDay23 bool
// TimeSatDay0 bool
// TimeSatDay1 bool
// TimeSatDay2 bool
// TimeSatDay3 bool
//
// TimeSunDay9 bool
// TimeSunDay10 bool
// TimeSunDay11 bool
// TimeSunDay12 bool
// TimeSunDay13 bool
// TimeSunDay14 bool
// TimeSunDay15 bool
// TimeSunDay16 bool
// TimeSunDay17 bool
// TimeSunDay18 bool
// TimeSunDay19 bool
// TimeSunDay20 bool
// TimeSunDay21 bool
// TimeSunDay22 bool
// TimeSunDay23 bool
// TimeSunDay0 bool
// TimeSunDay1 bool
// TimeSunDay2 bool
// TimeSunDay3 bool
//
// TimeSpecialDay9 bool
// TimeSpecialDay10 bool
// TimeSpecialDay11 bool
// TimeSpecialDay12 bool
// TimeSpecialDay13 bool
// TimeSpecialDay14 bool
// TimeSpecialDay15 bool
// TimeSpecialDay16 bool
// TimeSpecialDay17 bool
// TimeSpecialDay18 bool
// TimeSpecialDay19 bool
// TimeSpecialDay20 bool
// TimeSpecialDay21 bool
// TimeSpecialDay22 bool
// TimeSpecialDay23 bool
// TimeSpecialDay0 bool
// TimeSpecialDay1 bool
// TimeSpecialDay2 bool
// TimeSpecialDay3 bool
//
// BodyWeight int
// BodyHeight int
// BodyFit int // 1 - 8


React.render(
    React.createElement(Search, null),
    document.getElementById('content')
);




function setupMap(lat, lng, onchanged) {
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
