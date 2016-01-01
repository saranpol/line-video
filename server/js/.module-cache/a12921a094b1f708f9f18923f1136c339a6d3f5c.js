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
        var r = this.refs;
        var data = {
            lat: this.state.lat,
            long: this.state.long,
            day: r.inputDay.getDOMNode().value,
            h9: r.h9.getValue(),
            h10: r.h10.getValue(),
            h11: r.h11.getValue(),
            h12: r.h12.getValue(),
            h13: r.h13.getValue(),
            h14: r.h14.getValue(),
            h15: r.h15.getValue(),
            h16: r.h16.getValue(),
            h17: r.h17.getValue(),
            h18: r.h18.getValue(),
            h19: r.h19.getValue(),
            h20: r.h20.getValue(),
            h21: r.h21.getValue(),
            h22: r.h22.getValue(),
            h23: r.h23.getValue(),
            h0: r.h0.getValue(),
            h1: r.h1.getValue(),
            h2: r.h2.getValue(),
            h3: r.h3.getValue(),
        };
        console.log(data);
        this.request = $.ajax({
            url: "search_user",
            data: data,
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
                            React.createElement("label", null, "เลือกวันที่คุณจะเตะบอล"), 
                            React.createElement("select", {onChange: this.updateData, ref: "inputDay", className: "form-control"}, 
                                React.createElement("option", {value: "0"}, "วันใดก็ได้"), 
                                React.createElement("option", {value: "1"}, "วันธรรมดา"), 
                                React.createElement("option", {value: "2"}, "วันเสาร์"), 
                                React.createElement("option", {value: "3"}, "วันอาทิตย์"), 
                                React.createElement("option", {value: "4"}, "วันหยุด")
                            ), 
                            React.createElement("br", null), 
                            React.createElement("label", null, "เลือกเวลาที่จะเตะบอล ถ้าไม่เลือกคือเวลาใดก็ได้"), 
                            React.createElement("div", null, 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h9", title: "9"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h10", title: "10"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h11", title: "11"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h12", title: "12"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h13", title: "13"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h14", title: "14"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h15", title: "15"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h16", title: "16"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h17", title: "17"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h18", title: "18"})
                            ), 
                            React.createElement("div", null, 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h19", title: "19"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h20", title: "20"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h21", title: "21"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h22", title: "22"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h23", title: "23"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h0", title: "เที่ยงคืน"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h1", title: "ตี 1"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h2", title: "ตี 2"}), 
                                React.createElement(InputCheckBox, {onChange: this.updateData, ref: "h3", title: "ตี 3"})
                            )
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
        return Math.round(d*10)/10;
    },
    getAge: function(birthday_string){
        var birthday = Date.parse(birthday_string);
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
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
        var img_style = {height:"80px"}
        if(u.ImageURL == ""){
            image_url = "/img/test.jpg";
        }else{
            image_url = u.ImageURL + "=s120";
        }
        var distance = this.calDistance(u.Location.Lat,u.Location.Lng);
        var age = this.getAge(u.Birthday);
        return (
            React.createElement("a", {href: url, target: "_blank"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-2"}, 
                        React.createElement("img", {style: img_style, src: image_url})
                    ), 
                    React.createElement("div", {className: "col-md-10"}, 
                        React.createElement("label", null, u.FirstName, " ", u.LastName, " (", u.NickName, ") อายุ: ", age, " ปี อยู่ห่างจากสนาม: ", distance, " กม."), 
                        React.createElement(AvailableTime, {user: u}), 
                        React.createElement(Position, {user: u}), 
                        React.createElement(Cost, {user: u})
                    )
                )

            )
        );
    }
});


var Position = React.createClass({displayName: "Position",
    addName: function(s, name){
        if(s != ""){
            s += ", ";
        }
        s += name;
        return s;
    },
    getPositionString: function() {
        var u = this.props.user;
        var s = "";
        if(u.PosGoal)
            s = this.addName(s, "ผู้รักษาประตู");
        if(u.PosCenterBack)
            s = this.addName(s, "เซ็นเตอร์แบ็ค");
        if(u.PosSweeper)
            s = this.addName(s, "สวีปเปอร์");
        if(u.PosFullBackL)
            s = this.addName(s, "ฟูลแบ็คซ้าย");
        if(u.PosFullBackR)
            s = this.addName(s, "ฟูลแบ็คขวา");
        if(u.PosWingBackL)
            s = this.addName(s, "วิงแบ็คซ้าย");
        if(u.PosWingBackR)
            s = this.addName(s, "วิงแบ็คขวา");
        if(u.PosCenterMid)
            s = this.addName(s, "เซ็นเตอร์มิดฟิลด์");
        if(u.PosDefMid)
            s = this.addName(s, "มิดฟิลด์ตัวรับ");
        if(u.PosAttackMid)
            s = this.addName(s, "มิดฟิลด์ตัวรุก");
        if(u.PosWideMid)
            s = this.addName(s, "มิดฟิลด์ด้านกว้าง");
        if(u.PosCenterForward)
            s = this.addName(s, "เซ็นเตอร์ฟอร์เวิร์ด");
        if(u.PosSecondStriker)
            s = this.addName(s, "กองหน้าตัวต่ำ");
        if(u.PosWingL)
            s = this.addName(s, "ปีกซ้าย");
        if(u.PosWingR)
            s = this.addName(s, "ปีกขวา");

        return s;
    },
    render: function() {
        var pos = this.getPositionString();
        return (
            React.createElement("div", null, "ตำแหน่ง: ", pos)
        );
    }
});


var Cost = React.createClass({displayName: "Cost",
    getCostString: function() {
        var u = this.props.user;
        var s = "";
        if(u.CostFreeHelpField)
            s = "ฟรี ช่วยออกค่าสนาม";
        else if(u.CostFreeNoHelpField)
            s = "ฟรี ไม่ออกค่าสนาม"
        else if(u.CostHour)
            s = "ชั่วโมงละ " + u.CostHourBaht + " บาท";
        return s;
    },
    render: function() {
        var cost = this.getCostString();
        return (
            React.createElement("div", null, "ค่าตัว: ", cost)
        );
    }
});
var AvailableTime = React.createClass({displayName: "AvailableTime",
    addName: function(s, name){
        if(s != ""){
            s += ", ";
        }
        s += name;
        return s;
    },
    getTimeString: function(day, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23, h0, h1, h2, h3){
        var v = "";
        if(h9 || h10 || h11 || h12 || h13 || h14 || h15 || h16 || h17 || h18 || h19 || h20 || h21 || h22 || h23 || h0 || h1 || h2 || h3){
            var s = ""
            if(h9) s = this.addName(s, "9");
            if(h10) s = this.addName(s, "10");
            if(h11) s = this.addName(s, "11");
            if(h12) s = this.addName(s, "12");
            if(h13) s = this.addName(s, "13");
            if(h14) s = this.addName(s, "14");
            if(h15) s = this.addName(s, "15");
            if(h16) s = this.addName(s, "16");
            if(h17) s = this.addName(s, "17");
            if(h18) s = this.addName(s, "18");
            if(h19) s = this.addName(s, "19");
            if(h20) s = this.addName(s, "20");
            if(h21) s = this.addName(s, "21");
            if(h22) s = this.addName(s, "22");
            if(h23) s = this.addName(s, "23");
            if(h0) s = this.addName(s, "0");
            if(h1) s = this.addName(s, "1");
            if(h2) s = this.addName(s, "2");
            if(h3) s = this.addName(s, "3");
            v = day + " (" + s + ")";
        }
        return v;
    },
    getString: function() {
        var u = this.props.user;
        var s = "";

        s = this.addName(s, this.getTimeString( "วันธรรมดา",
                                                u.TimeNormalDay9,
                                                u.TimeNormalDay10,
                                                u.TimeNormalDay11,
                                                u.TimeNormalDay12,
                                                u.TimeNormalDay13,
                                                u.TimeNormalDay14,
                                                u.TimeNormalDay15,
                                                u.TimeNormalDay16,
                                                u.TimeNormalDay17,
                                                u.TimeNormalDay18,
                                                u.TimeNormalDay19,
                                                u.TimeNormalDay20,
                                                u.TimeNormalDay21,
                                                u.TimeNormalDay22,
                                                u.TimeNormalDay23,
                                                u.TimeNormalDay0,
                                                u.TimeNormalDay1,
                                                u.TimeNormalDay2,
                                                u.TimeNormalDay3));

        s = this.addName(s, this.getTimeString( "วันเสาร์",
                                                u.TimeSatDay9,
                                                u.TimeSatDay10,
                                                u.TimeSatDay11,
                                                u.TimeSatDay12,
                                                u.TimeSatDay13,
                                                u.TimeSatDay14,
                                                u.TimeSatDay15,
                                                u.TimeSatDay16,
                                                u.TimeSatDay17,
                                                u.TimeSatDay18,
                                                u.TimeSatDay19,
                                                u.TimeSatDay20,
                                                u.TimeSatDay21,
                                                u.TimeSatDay22,
                                                u.TimeSatDay23,
                                                u.TimeSatDay0,
                                                u.TimeSatDay1,
                                                u.TimeSatDay2,
                                                u.TimeSatDay3));

        s = this.addName(s, this.getTimeString( "วันอาทิตย์",
                                                u.TimeSunDay9,
                                                u.TimeSunDay10,
                                                u.TimeSunDay11,
                                                u.TimeSunDay12,
                                                u.TimeSunDay13,
                                                u.TimeSunDay14,
                                                u.TimeSunDay15,
                                                u.TimeSunDay16,
                                                u.TimeSunDay17,
                                                u.TimeSunDay18,
                                                u.TimeSunDay19,
                                                u.TimeSunDay20,
                                                u.TimeSunDay21,
                                                u.TimeSunDay22,
                                                u.TimeSunDay23,
                                                u.TimeSunDay0,
                                                u.TimeSunDay1,
                                                u.TimeSunDay2,
                                                u.TimeSunDay3));

        s = this.addName(s, this.getTimeString( "วันหยุด",
                                                u.TimeSpecialDay9,
                                                u.TimeSpecialDay10,
                                                u.TimeSpecialDay11,
                                                u.TimeSpecialDay12,
                                                u.TimeSpecialDay13,
                                                u.TimeSpecialDay14,
                                                u.TimeSpecialDay15,
                                                u.TimeSpecialDay16,
                                                u.TimeSpecialDay17,
                                                u.TimeSpecialDay18,
                                                u.TimeSpecialDay19,
                                                u.TimeSpecialDay20,
                                                u.TimeSpecialDay21,
                                                u.TimeSpecialDay22,
                                                u.TimeSpecialDay23,
                                                u.TimeSpecialDay0,
                                                u.TimeSpecialDay1,
                                                u.TimeSpecialDay2,
                                                u.TimeSpecialDay3));
        return s;
    },
    render: function() {
        var t = this.getString();
        return (
            React.createElement("div", null, "เวลาว่าง: ", t)
        );
    }
});



var InputCheckBox = React.createClass({displayName: "InputCheckBox",
    setValue: function(v) {
        this.refs.input.getDOMNode().checked = v;
    },
    getValue: function() {
        return this.refs.input.getDOMNode().checked ? 1 : 0;
    },
    render: function() {
        var p = this.props;
        return (
            React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {onChange: p.onChange, ref: "input", type: "checkbox"}), p.title)
        );
    }
});



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
