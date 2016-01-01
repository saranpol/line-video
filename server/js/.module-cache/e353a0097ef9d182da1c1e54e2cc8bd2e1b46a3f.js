"use strict";

var Search = React.createClass({
    displayName: "Search",

    getInitialState: function getInitialState() {
        var p = $.cookie("token");
        var fid = $.cookie("FB_userID");
        if (fid === undefined || fid === null) fid = "";
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
            mIsShowMap: true
        };
    },
    componentDidMount: function componentDidMount() {
        this.updateData();
        initFacebook(this.didInitFacebook);
        setupMap(this.state.lat, this.state.long, this.onMapChange);
        this.updateCurrentLocation();
    },
    setupLoginData: function setupLoginData(res) {
        this.state.FB_login = true;
        this.state.FB_userID = res.authResponse.userID;
        this.state.FB_accessToken = res.authResponse.accessToken;
        this.forceUpdate();
    },
    didInitFacebook: function didInitFacebook() {
        FB.getLoginStatus((function (res) {
            if (res.status === 'connected') {
                this.setupLoginData(res);
            } else {
                this.state.FB_login = false;
            }
            this.forceUpdate();
        }).bind(this));
    },
    updateData: function updateData() {
        var r = this.refs;
        var t = r.inputTime.value;
        var data = {
            lat: this.state.lat,
            long: this.state.long,
            day: r.inputDay.value,
            h9: t == "h9",
            h10: t == "h10",
            h11: t == "h11",
            h12: t == "h12",
            h13: t == "h13",
            h14: t == "h14",
            h15: t == "h15",
            h16: t == "h16",
            h17: t == "h17",
            h18: t == "h18",
            h19: t == "h19",
            h20: t == "h20",
            h21: t == "h21",
            h22: t == "h22",
            h23: t == "h23",
            h0: t == "h0",
            h1: t == "h1",
            h2: t == "h2",
            h3: t == "h3"
        };
        // console.log(data);
        this.request = $.ajax({
            method: "POST",
            url: "search_user",
            data: data,
            dataType: 'json',
            cache: false,
            success: (function (json) {
                // console.log(json);
                this.state.userList = json.UserList;
                this.forceUpdate();
            }).bind(this),
            error: (function (xhr, status, err) {
                console.log(xhr, status, err.toString());
            }).bind(this)
        });
    },
    updateCurrentLocation: function updateCurrentLocation() {
        this.state.locationStatus = "กำลังค้นหา...";
        this.forceUpdate();
        navigator.geolocation.getCurrentPosition((function (position) {
            $('#locationPicker').locationpicker('location', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            this.state.locationStatus = "";
            this.state.lat = position.coords.latitude;
            this.state.long = position.coords.longitude;
            this.forceUpdate();
            this.updateData();
        }).bind(this));
    },
    onMapChange: function onMapChange(currentLocation, radius, isMarkerDropped) {
        this.state.lat = currentLocation.latitude;
        this.state.long = currentLocation.longitude;
        this.updateData();
    },
    checkResize: function checkResize() {
        var map = $('#locationPicker').locationpicker('map').map;
        google.maps.event.trigger(map, "resize");
    },
    hideMap: function hideMap() {
        this.state.mIsShowMap = !this.state.mIsShowMap;
        this.forceUpdate();
        // if(this.state.mIsShowMap){
        //     setTimeout(function() { this.checkResize(); }.bind(this), 100);
        // }
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.state.mIsShowMap) {
            this.checkResize();
        }
    },
    render: function render() {
        var locationStyle = { width: "100%", height: "100%" };
        var mapClass = "search-right";
        var bword = "ผลลัพธ์";
        if (!this.state.mIsShowMap) {
            bword = "แผนที่";
            mapClass = "search-right hidden";
        }
        return React.createElement(
            "div",
            null,
            React.createElement(Nav, { fullWidth: true, FB_userID: this.state.FB_userID }),
            React.createElement(
                "div",
                { className: "container-fullwidth pad-nav" },
                React.createElement(
                    "div",
                    { className: "search-left" },
                    React.createElement(
                        "div",
                        { className: "search-date-time form-inline" },
                        React.createElement(
                            "span",
                            { className: "search-date-time-font" },
                            "หาคนที่ว่าง"
                        ),
                        React.createElement(
                            "select",
                            { onChange: this.updateData, ref: "inputDay", className: "form-control-2 search-date" },
                            React.createElement(
                                "option",
                                { value: "0" },
                                "วันใดก็ได้"
                            ),
                            React.createElement(
                                "option",
                                { value: "1" },
                                "วันธรรมดา"
                            ),
                            React.createElement(
                                "option",
                                { value: "2" },
                                "วันเสาร์"
                            ),
                            React.createElement(
                                "option",
                                { value: "3" },
                                "วันอาทิตย์"
                            ),
                            React.createElement(
                                "option",
                                { value: "4" },
                                "วันหยุด"
                            )
                        ),
                        React.createElement(
                            "select",
                            { onChange: this.updateData, ref: "inputTime", className: "form-control-2 search-time" },
                            React.createElement(
                                "option",
                                { value: "-" },
                                "เวลาใดก็ได้"
                            ),
                            React.createElement(
                                "option",
                                { value: "h9" },
                                "09:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h10" },
                                "10:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h11" },
                                "11:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h12" },
                                "12:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h13" },
                                "13:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h14" },
                                "14:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h15" },
                                "15:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h16" },
                                "16:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h17" },
                                "17:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h18" },
                                "18:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h19" },
                                "19:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h20" },
                                "20:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h21" },
                                "21:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h22" },
                                "22:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h23" },
                                "23:00"
                            ),
                            React.createElement(
                                "option",
                                { value: "h0" },
                                "เที่ยงคืน"
                            ),
                            React.createElement(
                                "option",
                                { value: "h1" },
                                "ตี 1"
                            ),
                            React.createElement(
                                "option",
                                { value: "h2" },
                                "ตี 2"
                            ),
                            React.createElement(
                                "option",
                                { value: "h3" },
                                "ตี 3"
                            )
                        ),
                        React.createElement(
                            "button",
                            { type: "button", onClick: this.hideMap, className: "btn btn-primary button-show-result" },
                            bword
                        )
                    ),
                    React.createElement(ResultList, { data: this.state.userList, search: this })
                ),
                React.createElement(
                    "div",
                    { className: mapClass },
                    React.createElement(
                        "div",
                        { className: "map-top-bar" },
                        React.createElement(
                            "button",
                            { type: "button", onClick: this.updateCurrentLocation, className: "btn btn-default" },
                            "ไปตำแหน่งปัจจุบัน"
                        ),
                        ' ',
                        this.state.locationStatus
                    ),
                    React.createElement("input", { type: "hidden", id: "inputAddress" }),
                    React.createElement("input", { type: "hidden", id: "inputLat" }),
                    React.createElement("input", { type: "hidden", id: "inputLong" }),
                    React.createElement("div", { id: "locationPicker", style: locationStyle })
                )
            )
        );
    }
});

var ResultList = React.createClass({
    displayName: "ResultList",

    render: function render() {
        // console.log(this.props.data);
        var userNodes = this.props.data.map((function (user) {
            return React.createElement(User, { key: user.FB_userID, user: user, search: this.props.search });
        }).bind(this));
        return React.createElement(
            "div",
            { className: "search-result" },
            userNodes
        );
    }
});

var User = React.createClass({
    displayName: "User",

    deg2rad: function deg2rad(deg) {
        return deg * (Math.PI / 180);
    },
    calDistance: function calDistance(lat1, lon1) {
        var lat2 = this.props.search.state.lat;
        var lon2 = this.props.search.state.long;
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return Math.round(d * 10) / 10;
    },
    getAge: function getAge(birthday_string) {
        var birthday = Date.parse(birthday_string);
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    render: function render() {
        var u = this.props.user;
        var url = "/";
        if (u.Username != "") {
            url += u.Username;
        } else {
            url += u.FB_userID;
        }
        var image_url;
        var img_style = { width: "140px" };
        if (u.ImageURL == "") {
            image_url = "/img/test.jpg";
        } else {
            if (mIsHttps) image_url = u.ImageURL.replace("http://", "https://") + "=s210";else image_url = u.ImageURL + "=s210";
        }
        var distance = this.calDistance(u.Location.Lat, u.Location.Lng);
        var age = this.getAge(u.Birthday);
        return React.createElement(
            "div",
            { className: "result" },
            React.createElement(
                "div",
                { className: "result-left" },
                React.createElement(
                    "a",
                    { href: url, target: "_blank" },
                    React.createElement("img", { className: "img-rounded", style: img_style, src: image_url })
                ),
                React.createElement(Position, { user: u })
            ),
            React.createElement(
                "div",
                { className: "result-right" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { href: url, target: "_blank", className: "result-title" },
                        u.FirstName,
                        " ",
                        u.LastName,
                        " - ",
                        u.NickName,
                        " (",
                        age,
                        " ปี)"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "result-distance" },
                    distance,
                    " กม."
                ),
                React.createElement(AvailableTime, { user: u }),
                React.createElement(Cost, { user: u }),
                React.createElement(Contact, { user: u })
            ),
            React.createElement("div", { className: "result-clear" })
        );
    }
});

var Position = React.createClass({
    displayName: "Position",

    render: function render() {
        var u = this.props.user;
        var PosGoal = '';
        var PosCenterBackL = '';
        var PosCenterBackR = '';
        var PosSweeper = '';
        var PosFullBackL = '';
        var PosFullBackR = '';
        var PosWingBackL = '';
        var PosWingBackR = '';
        var PosCenterMidL = '';
        var PosCenterMidR = '';
        var PosDefMid = '';
        var PosAttackMid = '';
        var PosWideMidL = '';
        var PosWideMidR = '';
        var PosCenterForwardL = '';
        var PosCenterForwardR = '';
        var PosSecondStriker = '';
        var PosWingL = '';
        var PosWingR = '';

        if (u.PosGoal) PosGoal = React.createElement("div", { className: "circle PosGoal" });
        if (u.PosCenterBack) {
            PosCenterBackL = React.createElement("div", { className: "circle PosCenterBackL" });
            PosCenterBackR = React.createElement("div", { className: "circle PosCenterBackR" });
        }
        if (u.PosSweeper) PosSweeper = React.createElement("div", { className: "circle PosSweeper" });

        if (u.PosFullBackL) PosFullBackL = React.createElement("div", { className: "circle PosFullBackL" });
        if (u.PosFullBackR) PosFullBackR = React.createElement("div", { className: "circle PosFullBackR" });
        if (u.PosWingBackL) PosWingBackL = React.createElement("div", { className: "circle PosWingBackL" });
        if (u.PosWingBackR) PosWingBackR = React.createElement("div", { className: "circle PosWingBackR" });
        if (u.PosCenterMid) {
            PosCenterMidL = React.createElement("div", { className: "circle PosCenterMidL" });
            PosCenterMidR = React.createElement("div", { className: "circle PosCenterMidR" });
        }
        if (u.PosDefMid) PosDefMid = React.createElement("div", { className: "circle PosDefMid" });
        if (u.PosAttackMid) PosAttackMid = React.createElement("div", { className: "circle PosAttackMid" });
        if (u.PosWideMid) {
            PosWideMidL = React.createElement("div", { className: "circle PosWideMidL" });
            PosWideMidR = React.createElement("div", { className: "circle PosWideMidR" });
        }
        if (u.PosCenterForward) {
            PosCenterForwardL = React.createElement("div", { className: "circle PosCenterForwardL" });
            PosCenterForwardR = React.createElement("div", { className: "circle PosCenterForwardR" });
        }
        if (u.PosSecondStriker) PosSecondStriker = React.createElement("div", { className: "circle PosSecondStriker" });
        if (u.PosWingL) PosWingL = React.createElement("div", { className: "circle PosWingL" });
        if (u.PosWingR) PosWingR = React.createElement("div", { className: "circle PosWingR" });
        return React.createElement(
            "div",
            { className: "field" },
            PosGoal,
            PosCenterBackL,
            PosCenterBackR,
            PosSweeper,
            PosFullBackL,
            PosFullBackR,
            PosWingBackL,
            PosWingBackR,
            PosCenterMidL,
            PosCenterMidR,
            PosDefMid,
            PosAttackMid,
            PosWideMidL,
            PosWideMidR,
            PosCenterForwardL,
            PosCenterForwardR,
            PosSecondStriker,
            PosWingL,
            PosWingR
        );
    }
});

var Cost = React.createClass({
    displayName: "Cost",

    getCostString: function getCostString() {
        var u = this.props.user;
        var s = "";
        if (u.CostFreeHelpField) s = "ฟรี ช่วยออกค่าสนาม";else if (u.CostFreeNoHelpField) s = "ฟรี ไม่ออกค่าสนาม";else if (u.CostHour) s = "ชั่วโมงละ " + u.CostHourBaht + " บาท";
        return s;
    },
    render: function render() {
        var cost = this.getCostString();
        return React.createElement(
            "div",
            { className: "result-cost" },
            cost
        );
    }
});

var Contact = React.createClass({
    displayName: "Contact",

    render: function render() {
        var u = this.props.user;
        var email = '';
        var line = '';
        var mobile = '';
        if (u.Email != '') {
            var m = "mailto:" + u.Email;
            email = React.createElement(
                "a",
                { href: m },
                "ส่งอีเมล์"
            );
        }
        if (u.LineID != '') {
            var m = "http://line.me/ti/p/~" + u.LineID;
            line = React.createElement(
                "a",
                { href: m },
                "Line"
            );
            // var m = "LineID: "+u.LineID;
            // line = (<span>{m}</span>)
        }
        if (u.Mobile != '') {
            var m = "tel:" + u.Mobile;
            mobile = React.createElement(
                "a",
                { href: m },
                "โทรมือถือ"
            );
        }
        return React.createElement(
            "div",
            { className: "result-contact" },
            line,
            ' ',
            email,
            ' ',
            mobile
        );
    }
});

var AvailableTime = React.createClass({
    displayName: "AvailableTime",

    addName: function addName(s, name) {
        if (name == "") {
            return s;
        }
        if (s != "") {
            s += ", ";
        }
        s += name;
        return s;
    },
    getTimeString: function getTimeString(h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23, h0, h1, h2, h3) {
        var v = "";
        if (h9 || h10 || h11 || h12 || h13 || h14 || h15 || h16 || h17 || h18 || h19 || h20 || h21 || h22 || h23 || h0 || h1 || h2 || h3) {
            var s = "";
            if (h9) s = this.addName(s, "9");
            if (h10) s = this.addName(s, "10");
            if (h11) s = this.addName(s, "11");
            if (h12) s = this.addName(s, "12");
            if (h13) s = this.addName(s, "13");
            if (h14) s = this.addName(s, "14");
            if (h15) s = this.addName(s, "15");
            if (h16) s = this.addName(s, "16");
            if (h17) s = this.addName(s, "17");
            if (h18) s = this.addName(s, "18");
            if (h19) s = this.addName(s, "19");
            if (h20) s = this.addName(s, "20");
            if (h21) s = this.addName(s, "21");
            if (h22) s = this.addName(s, "22");
            if (h23) s = this.addName(s, "23");
            if (h0) s = this.addName(s, "เที่ยงคืน");
            if (h1) s = this.addName(s, "ตี1");
            if (h2) s = this.addName(s, "ตี2");
            if (h3) s = this.addName(s, "ตี3");
            v = s;
        }
        return v;
    },
    render: function render() {
        var u = this.props.user;

        var normal = this.getTimeString(u.TimeNormalDay9, u.TimeNormalDay10, u.TimeNormalDay11, u.TimeNormalDay12, u.TimeNormalDay13, u.TimeNormalDay14, u.TimeNormalDay15, u.TimeNormalDay16, u.TimeNormalDay17, u.TimeNormalDay18, u.TimeNormalDay19, u.TimeNormalDay20, u.TimeNormalDay21, u.TimeNormalDay22, u.TimeNormalDay23, u.TimeNormalDay0, u.TimeNormalDay1, u.TimeNormalDay2, u.TimeNormalDay3);

        var sat = this.getTimeString(u.TimeSatDay9, u.TimeSatDay10, u.TimeSatDay11, u.TimeSatDay12, u.TimeSatDay13, u.TimeSatDay14, u.TimeSatDay15, u.TimeSatDay16, u.TimeSatDay17, u.TimeSatDay18, u.TimeSatDay19, u.TimeSatDay20, u.TimeSatDay21, u.TimeSatDay22, u.TimeSatDay23, u.TimeSatDay0, u.TimeSatDay1, u.TimeSatDay2, u.TimeSatDay3);

        var sun = this.getTimeString(u.TimeSunDay9, u.TimeSunDay10, u.TimeSunDay11, u.TimeSunDay12, u.TimeSunDay13, u.TimeSunDay14, u.TimeSunDay15, u.TimeSunDay16, u.TimeSunDay17, u.TimeSunDay18, u.TimeSunDay19, u.TimeSunDay20, u.TimeSunDay21, u.TimeSunDay22, u.TimeSunDay23, u.TimeSunDay0, u.TimeSunDay1, u.TimeSunDay2, u.TimeSunDay3);

        var special = this.getTimeString(u.TimeSpecialDay9, u.TimeSpecialDay10, u.TimeSpecialDay11, u.TimeSpecialDay12, u.TimeSpecialDay13, u.TimeSpecialDay14, u.TimeSpecialDay15, u.TimeSpecialDay16, u.TimeSpecialDay17, u.TimeSpecialDay18, u.TimeSpecialDay19, u.TimeSpecialDay20, u.TimeSpecialDay21, u.TimeSpecialDay22, u.TimeSpecialDay23, u.TimeSpecialDay0, u.TimeSpecialDay1, u.TimeSpecialDay2, u.TimeSpecialDay3);

        return React.createElement(
            "div",
            { className: "free-time-box" },
            React.createElement(
                "span",
                { className: "free-time" },
                "เวลาว่าง"
            ),
            React.createElement(
                "table",
                { className: "free-time-table" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            "ธรรมดา"
                        ),
                        React.createElement(
                            "td",
                            null,
                            normal
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            "เสาร์"
                        ),
                        React.createElement(
                            "td",
                            null,
                            sat
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            "อาทิตย์"
                        ),
                        React.createElement(
                            "td",
                            null,
                            sun
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            "วันหยุด"
                        ),
                        React.createElement(
                            "td",
                            null,
                            special
                        )
                    )
                )
            )
        );
    }
});

var InputCheckBox = React.createClass({
    displayName: "InputCheckBox",

    setValue: function setValue(v) {
        this.refs.input.checked = v;
    },
    getValue: function getValue() {
        return this.refs.input.checked ? 1 : 0;
    },
    render: function render() {
        var p = this.props;
        return React.createElement(
            "label",
            { className: "checkbox-inline" },
            React.createElement("input", { onChange: p.onChange, ref: "input", type: "checkbox" }),
            p.title
        );
    }
});

ReactDOM.render(React.createElement(Search, null), document.getElementById('content'));

function setupMap(lat, lng, onchanged) {
    $('#locationPicker').locationpicker({
        location: { latitude: lat, longitude: lng },
        radius: 5000,
        zoom: 12,
        inputBinding: {
            latitudeInput: $('#inputLat'),
            longitudeInput: $('#inputLong'),
            locationNameInput: $('#inputAddress')
        },
        scrollwheel: false,
        onchanged: onchanged
    });
}