"use strict";

var Me = React.createClass({
    displayName: "Me",

    getInitialState: function getInitialState() {
        var p = $.cookie("token");
        var fid = $.cookie("FB_userID");
        var fb_token = $.cookie("FB_accessToken");
        if (fid === undefined || fid === null) fid = "";
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
            FB_login: false,
            FB_userID: fid,
            FB_accessToken: fb_token,
            gotData: false,
            locationStatus: ""
        };
    },
    componentDidMount: function componentDidMount() {
        if (!this.state.isLogin) {
            window.location.href = "/";
            return;
        }
        this.updateMeData();
        initFacebook(this.didInitFacebook);
    },
    didInitFacebook: function didInitFacebook() {
        FB.getLoginStatus((function (res) {
            if (res.status === 'connected') {
                this.state.FB_login = true;
                this.state.FB_userID = res.authResponse.userID;
                this.state.FB_accessToken = res.authResponse.accessToken;
                $.cookie("FB_accessToken", this.state.FB_accessToken, { expires: 100000 });
            } else {
                this.state.FB_login = false;
            }
            this.forceUpdate();
            if (this.state.FB_login) {
                // this.updateMeData();
            } else {
                    window.location.href = "/";
                }
        }).bind(this));
    },
    updateMeData: function updateMeData() {
        // get user
        var s = this.state;
        this.request = $.ajax({
            method: "POST",
            url: "get_user",
            data: {
                token: $.cookie("token"),
                FB_userID: this.state.FB_userID,
                FB_accessToken: this.state.FB_accessToken
            },
            dataType: 'json',
            cache: false,
            success: (function (json) {
                // console.log(json);

                mTimeData[0].Normal = json.TimeNormalDay9;
                mTimeData[1].Normal = json.TimeNormalDay10;
                mTimeData[2].Normal = json.TimeNormalDay11;
                mTimeData[3].Normal = json.TimeNormalDay12;
                mTimeData[4].Normal = json.TimeNormalDay13;
                mTimeData[5].Normal = json.TimeNormalDay14;
                mTimeData[6].Normal = json.TimeNormalDay15;
                mTimeData[7].Normal = json.TimeNormalDay16;
                mTimeData[8].Normal = json.TimeNormalDay17;
                mTimeData[9].Normal = json.TimeNormalDay18;
                mTimeData[10].Normal = json.TimeNormalDay19;
                mTimeData[11].Normal = json.TimeNormalDay20;
                mTimeData[12].Normal = json.TimeNormalDay21;
                mTimeData[13].Normal = json.TimeNormalDay23;
                mTimeData[14].Normal = json.TimeNormalDay23;
                mTimeData[15].Normal = json.TimeNormalDay0;
                mTimeData[16].Normal = json.TimeNormalDay1;
                mTimeData[17].Normal = json.TimeNormalDay2;
                mTimeData[18].Normal = json.TimeNormalDay3;

                mTimeData[0].Sat = json.TimeSatDay9;
                mTimeData[1].Sat = json.TimeSatDay10;
                mTimeData[2].Sat = json.TimeSatDay11;
                mTimeData[3].Sat = json.TimeSatDay12;
                mTimeData[4].Sat = json.TimeSatDay13;
                mTimeData[5].Sat = json.TimeSatDay14;
                mTimeData[6].Sat = json.TimeSatDay15;
                mTimeData[7].Sat = json.TimeSatDay16;
                mTimeData[8].Sat = json.TimeSatDay17;
                mTimeData[9].Sat = json.TimeSatDay18;
                mTimeData[10].Sat = json.TimeSatDay19;
                mTimeData[11].Sat = json.TimeSatDay20;
                mTimeData[12].Sat = json.TimeSatDay21;
                mTimeData[13].Sat = json.TimeSatDay23;
                mTimeData[14].Sat = json.TimeSatDay23;
                mTimeData[15].Sat = json.TimeSatDay0;
                mTimeData[16].Sat = json.TimeSatDay1;
                mTimeData[17].Sat = json.TimeSatDay2;
                mTimeData[18].Sat = json.TimeSatDay3;

                mTimeData[0].Sun = json.TimeSunDay9;
                mTimeData[1].Sun = json.TimeSunDay10;
                mTimeData[2].Sun = json.TimeSunDay11;
                mTimeData[3].Sun = json.TimeSunDay12;
                mTimeData[4].Sun = json.TimeSunDay13;
                mTimeData[5].Sun = json.TimeSunDay14;
                mTimeData[6].Sun = json.TimeSunDay15;
                mTimeData[7].Sun = json.TimeSunDay16;
                mTimeData[8].Sun = json.TimeSunDay17;
                mTimeData[9].Sun = json.TimeSunDay18;
                mTimeData[10].Sun = json.TimeSunDay19;
                mTimeData[11].Sun = json.TimeSunDay20;
                mTimeData[12].Sun = json.TimeSunDay21;
                mTimeData[13].Sun = json.TimeSunDay23;
                mTimeData[14].Sun = json.TimeSunDay23;
                mTimeData[15].Sun = json.TimeSunDay0;
                mTimeData[16].Sun = json.TimeSunDay1;
                mTimeData[17].Sun = json.TimeSunDay2;
                mTimeData[18].Sun = json.TimeSunDay3;

                mTimeData[0].Special = json.TimeSpecialDay9;
                mTimeData[1].Special = json.TimeSpecialDay10;
                mTimeData[2].Special = json.TimeSpecialDay11;
                mTimeData[3].Special = json.TimeSpecialDay12;
                mTimeData[4].Special = json.TimeSpecialDay13;
                mTimeData[5].Special = json.TimeSpecialDay14;
                mTimeData[6].Special = json.TimeSpecialDay15;
                mTimeData[7].Special = json.TimeSpecialDay16;
                mTimeData[8].Special = json.TimeSpecialDay17;
                mTimeData[9].Special = json.TimeSpecialDay18;
                mTimeData[10].Special = json.TimeSpecialDay19;
                mTimeData[11].Special = json.TimeSpecialDay20;
                mTimeData[12].Special = json.TimeSpecialDay21;
                mTimeData[13].Special = json.TimeSpecialDay23;
                mTimeData[14].Special = json.TimeSpecialDay23;
                mTimeData[15].Special = json.TimeSpecialDay0;
                mTimeData[16].Special = json.TimeSpecialDay1;
                mTimeData[17].Special = json.TimeSpecialDay2;
                mTimeData[18].Special = json.TimeSpecialDay3;

                this.state.gotData = true;
                this.forceUpdate();
                var r = this.refs;
                r.inputFirstName.setText(json.FirstName);
                r.inputLastName.setText(json.LastName);
                r.inputNickName.setText(json.NickName);
                r.inputEmail.setText(json.Email);
                r.inputLineID.setText(json.LineID);
                r.inputUsername.setText(json.Username);
                r.inputMobile.setText(json.Mobile);
                setupBirthday(json.Birthday);

                r.inputPosGoal.setValue(json.PosGoal);
                r.inputPosCenterBack.setValue(json.PosCenterBack);
                r.inputPosSweeper.setValue(json.PosSweeper);
                r.inputPosFullBackL.setValue(json.PosFullBackL);
                r.inputPosFullBackR.setValue(json.PosFullBackR);
                r.inputPosWingBackL.setValue(json.PosWingBackL);
                r.inputPosWingBackR.setValue(json.PosWingBackR);

                r.inputPosCenterMid.setValue(json.PosCenterMid);
                r.inputPosDefMid.setValue(json.PosDefMid);
                r.inputPosAttackMid.setValue(json.PosAttackMid);
                r.inputPosWideMid.setValue(json.PosWideMid);

                r.inputPosCenterForward.setValue(json.PosCenterForward);
                r.inputPosSecondStriker.setValue(json.PosSecondStriker);
                r.inputPosWingL.setValue(json.PosWingL);
                r.inputPosWingR.setValue(json.PosWingR);

                r.inputCostFreeHelpField.setValue(json.CostFreeHelpField);
                r.inputCostFreeNoHelpField.setValue(json.CostFreeNoHelpField);
                r.inputCostHour.setValue(json.CostHour);
                r.inputCostHourBaht.value = json.CostHourBaht;

                r.inputExpNearHome.setValue(json.ExpNearHome);
                r.inputExpSchool.setValue(json.ExpSchool);
                r.inputExpUniversity.setValue(json.ExpUniversity);
                r.inputExpProvince.setValue(json.ExpProvince);
                r.inputExpTour.setValue(json.ExpTour);
                r.inputExpClub.setValue(json.ExpClub);
                r.inputExpNation.setValue(json.ExpNation);

                r.inputFieldGrass.setValue(json.FieldGrass);
                r.inputFieldFakeGrass.setValue(json.FieldFakeGrass);
                r.inputFieldHard.setValue(json.FieldHard);
                r.inputFieldSand.setValue(json.FieldSand);
                r.inputFieldClay.setValue(json.FieldClay);
                r.inputFieldRain.setValue(json.FieldRain);

                r.inputSize11.setValue(json.Size11);
                r.inputSize7_9.setValue(json.Size7_9);
                r.inputSize3_6.setValue(json.Size3_6);
                r.inputSize11up.setValue(json.Size11up);

                r.inputBodyWeight.setText(json.BodyWeight);
                r.inputBodyHeight.setText(json.BodyHeight);
                r.inputBodyFit.value = json.BodyFit;

                r.inputYoutubeURL.value = json.YoutubeURL;

                this.refs.profileImage.setImageURL(json.ImageURL);

                setupMap(json.Location.Lat, json.Location.Lng);
            }).bind(this),
            error: (function (xhr, status, err) {
                console.log(xhr, status, err.toString());
            }).bind(this)
        });

        // FB.api('/me?fields=first_name,last_name,email,birthday', function(res) {
        //     console.log('Successful login for: ' + JSON.stringify(res));
        //     this.refs.inputFirstName.setText(res.first_name);
        //     this.refs.inputLastName.setText(res.last_name);
        //     this.refs.inputEmail.setText(res.email);
        //     setupBirthday();
        //     setupMap();
        // }.bind(this));
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
            this.forceUpdate();
        }).bind(this));
    },
    saveData: function saveData(e) {
        e.preventDefault();
        var r = this.refs;
        var data = {
            FB_userID: this.state.FB_userID,
            FirstName: r.inputFirstName.getText(),
            LastName: r.inputLastName.getText(),
            NickName: r.inputNickName.getText(),
            Email: r.inputEmail.getText(),
            LineID: r.inputLineID.getText(),
            Username: r.inputUsername.getText(),
            Mobile: r.inputMobile.getText(),
            Birthday: getBirthdayValue(),

            PosGoal: r.inputPosGoal.getValue(),
            PosCenterBack: r.inputPosCenterBack.getValue(),
            PosSweeper: r.inputPosSweeper.getValue(),
            PosFullBackL: r.inputPosFullBackL.getValue(),
            PosFullBackR: r.inputPosFullBackR.getValue(),
            PosWingBackL: r.inputPosWingBackL.getValue(),
            PosWingBackR: r.inputPosWingBackR.getValue(),

            PosCenterMid: r.inputPosCenterMid.getValue(),
            PosDefMid: r.inputPosDefMid.getValue(),
            PosAttackMid: r.inputPosAttackMid.getValue(),
            PosWideMid: r.inputPosWideMid.getValue(),

            PosCenterForward: r.inputPosCenterForward.getValue(),
            PosSecondStriker: r.inputPosSecondStriker.getValue(),
            PosWingL: r.inputPosWingL.getValue(),
            PosWingR: r.inputPosWingR.getValue(),

            CostFreeHelpField: r.inputCostFreeHelpField.getValue(),
            CostFreeNoHelpField: r.inputCostFreeNoHelpField.getValue(),
            CostHour: r.inputCostHour.getValue(),
            CostHourBaht: r.inputCostHourBaht.value,

            ExpNearHome: r.inputExpNearHome.getValue(),
            ExpSchool: r.inputExpSchool.getValue(),
            ExpUniversity: r.inputExpUniversity.getValue(),
            ExpProvince: r.inputExpProvince.getValue(),
            ExpTour: r.inputExpTour.getValue(),
            ExpClub: r.inputExpClub.getValue(),
            ExpNation: r.inputExpNation.getValue(),

            FieldGrass: r.inputFieldGrass.getValue(),
            FieldFakeGrass: r.inputFieldFakeGrass.getValue(),
            FieldHard: r.inputFieldHard.getValue(),
            FieldSand: r.inputFieldSand.getValue(),
            FieldClay: r.inputFieldClay.getValue(),
            FieldRain: r.inputFieldRain.getValue(),

            Size11: r.inputSize11.getValue(),
            Size7_9: r.inputSize7_9.getValue(),
            Size3_6: r.inputSize3_6.getValue(),
            Size11up: r.inputSize11up.getValue(),

            TimeNormalDay9: mTimeData[0].Normal,
            TimeNormalDay10: mTimeData[1].Normal,
            TimeNormalDay11: mTimeData[2].Normal,
            TimeNormalDay12: mTimeData[3].Normal,
            TimeNormalDay13: mTimeData[4].Normal,
            TimeNormalDay14: mTimeData[5].Normal,
            TimeNormalDay15: mTimeData[6].Normal,
            TimeNormalDay16: mTimeData[7].Normal,
            TimeNormalDay17: mTimeData[8].Normal,
            TimeNormalDay18: mTimeData[9].Normal,
            TimeNormalDay19: mTimeData[10].Normal,
            TimeNormalDay20: mTimeData[11].Normal,
            TimeNormalDay21: mTimeData[12].Normal,
            TimeNormalDay22: mTimeData[13].Normal,
            TimeNormalDay23: mTimeData[14].Normal,
            TimeNormalDay0: mTimeData[15].Normal,
            TimeNormalDay1: mTimeData[16].Normal,
            TimeNormalDay2: mTimeData[17].Normal,
            TimeNormalDay3: mTimeData[18].Normal,

            TimeSatDay9: mTimeData[0].Sat,
            TimeSatDay10: mTimeData[1].Sat,
            TimeSatDay11: mTimeData[2].Sat,
            TimeSatDay12: mTimeData[3].Sat,
            TimeSatDay13: mTimeData[4].Sat,
            TimeSatDay14: mTimeData[5].Sat,
            TimeSatDay15: mTimeData[6].Sat,
            TimeSatDay16: mTimeData[7].Sat,
            TimeSatDay17: mTimeData[8].Sat,
            TimeSatDay18: mTimeData[9].Sat,
            TimeSatDay19: mTimeData[10].Sat,
            TimeSatDay20: mTimeData[11].Sat,
            TimeSatDay21: mTimeData[12].Sat,
            TimeSatDay22: mTimeData[13].Sat,
            TimeSatDay23: mTimeData[14].Sat,
            TimeSatDay0: mTimeData[15].Sat,
            TimeSatDay1: mTimeData[16].Sat,
            TimeSatDay2: mTimeData[17].Sat,
            TimeSatDay3: mTimeData[18].Sat,

            TimeSunDay9: mTimeData[0].Sun,
            TimeSunDay10: mTimeData[1].Sun,
            TimeSunDay11: mTimeData[2].Sun,
            TimeSunDay12: mTimeData[3].Sun,
            TimeSunDay13: mTimeData[4].Sun,
            TimeSunDay14: mTimeData[5].Sun,
            TimeSunDay15: mTimeData[6].Sun,
            TimeSunDay16: mTimeData[7].Sun,
            TimeSunDay17: mTimeData[8].Sun,
            TimeSunDay18: mTimeData[9].Sun,
            TimeSunDay19: mTimeData[10].Sun,
            TimeSunDay20: mTimeData[11].Sun,
            TimeSunDay21: mTimeData[12].Sun,
            TimeSunDay22: mTimeData[13].Sun,
            TimeSunDay23: mTimeData[14].Sun,
            TimeSunDay0: mTimeData[15].Sun,
            TimeSunDay1: mTimeData[16].Sun,
            TimeSunDay2: mTimeData[17].Sun,
            TimeSunDay3: mTimeData[18].Sun,

            TimeSpecialDay9: mTimeData[0].Special,
            TimeSpecialDay10: mTimeData[1].Special,
            TimeSpecialDay11: mTimeData[2].Special,
            TimeSpecialDay12: mTimeData[3].Special,
            TimeSpecialDay13: mTimeData[4].Special,
            TimeSpecialDay14: mTimeData[5].Special,
            TimeSpecialDay15: mTimeData[6].Special,
            TimeSpecialDay16: mTimeData[7].Special,
            TimeSpecialDay17: mTimeData[8].Special,
            TimeSpecialDay18: mTimeData[9].Special,
            TimeSpecialDay19: mTimeData[10].Special,
            TimeSpecialDay20: mTimeData[11].Special,
            TimeSpecialDay21: mTimeData[12].Special,
            TimeSpecialDay22: mTimeData[13].Special,
            TimeSpecialDay23: mTimeData[14].Special,
            TimeSpecialDay0: mTimeData[15].Special,
            TimeSpecialDay1: mTimeData[16].Special,
            TimeSpecialDay2: mTimeData[17].Special,
            TimeSpecialDay3: mTimeData[18].Special,

            BodyWeight: r.inputBodyWeight.getText(),
            BodyHeight: r.inputBodyHeight.getText(),
            BodyFit: r.inputBodyFit.value,

            YoutubeURL: r.inputYoutubeURL.value,

            LocationLat: $("#inputLat").val(),
            LocationLong: $("#inputLong").val(),

            token: $.cookie("token"),
            FB_userID: this.state.FB_userID
        };
        // console.log(data);
        this.requestSaveData = $.ajax({
            method: "POST",
            url: "update_user",
            data: data,
            dataType: 'json',
            cache: false,
            success: (function (json) {
                if (json.Success == 1) {
                    this.refs.dialogInfoSaveDone.show();
                } else {
                    alert(json.Reason);
                }
            }).bind(this),
            error: (function (xhr, status, err) {
                alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                console.log(xhr, status, err.toString());
            }).bind(this)
        });
    },
    disableCostHourBaht: function disableCostHourBaht() {
        this.refs.inputCostHourBaht.value = 0;
        this.refs.inputCostHourBaht.disabled = true;
    },
    enableCostHourBaht: function enableCostHourBaht() {
        this.refs.inputCostHourBaht.disabled = false;
    },
    render: function render() {
        var content;

        if (this.state.gotData) {
            var locationStyle = { width: "100%", height: "388px" };

            content = React.createElement(
                "div",
                { className: "container pad-nav me-top" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement(ProfileImage, { ref: "profileImage", FB_userID: this.state.FB_userID }),
                        React.createElement(
                            "div",
                            { className: "form-horizontal card" },
                            React.createElement(
                                "div",
                                { className: "section-title text-center" },
                                "ข้อมูลพื้นฐาน"
                            ),
                            React.createElement(TextInput, { ref: "inputFirstName", type: "text", name: "ชื่อ" }),
                            React.createElement(TextInput, { ref: "inputLastName", type: "text", name: "นามสกุล" }),
                            React.createElement(TextInput, { ref: "inputNickName", type: "text", name: "ชื่อเล่น" }),
                            React.createElement(TextInput, { ref: "inputUsername", type: "text", name: "ชื่อผู้ใช้", placeholder: "Username" })
                        ),
                        React.createElement(
                            "div",
                            { className: "form-horizontal card" },
                            React.createElement(
                                "div",
                                { className: "section-title text-center" },
                                "ข้อมูลทางกายภาพ"
                            ),
                            React.createElement(
                                "div",
                                { className: "body-icon" },
                                React.createElement("img", { src: "/img/body_icon.png" })
                            ),
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "div",
                                    { className: "col-sm-12" },
                                    React.createElement(
                                        "div",
                                        { className: "section-title-2" },
                                        "วันเกิด"
                                    ),
                                    React.createElement("div", { className: "form-inline", id: "birthdayPicker" })
                                )
                            ),
                            React.createElement(TextInputInline, { ref: "inputBodyWeight", type: "number", name: "น้ำหนัก", afterText: "กก." }),
                            React.createElement(TextInputInline, { ref: "inputBodyHeight", type: "number", name: "ส่วนสูง", afterText: "ซม." }),
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "div",
                                    { className: "col-sm-12" },
                                    React.createElement(
                                        "select",
                                        { ref: "inputBodyFit", className: "form-control input-font" },
                                        React.createElement(
                                            "option",
                                            { value: "0" },
                                            "ความฟิต"
                                        ),
                                        React.createElement(
                                            "option",
                                            { value: "1" },
                                            "ฟิตซ้อมอย่างมืออาชีพ (100%)"
                                        ),
                                        React.createElement(
                                            "option",
                                            { value: "2" },
                                            "เตะเกือบทุกวัน (80%)"
                                        ),
                                        React.createElement(
                                            "option",
                                            { value: "3" },
                                            "เตะทุกอาทิตย์ (60%)"
                                        ),
                                        React.createElement(
                                            "option",
                                            { value: "4" },
                                            "เตะทุกเดือน (50%)"
                                        ),
                                        React.createElement(
                                            "option",
                                            { value: "5" },
                                            "ไม่ได้เตะมาหลายเดือน (40%)"
                                        ),
                                        React.createElement(
                                            "option",
                                            { value: "6" },
                                            "มีอาการบาดเจ็บเล็กน้อย (30%) "
                                        ),
                                        React.createElement(
                                            "option",
                                            { value: "7" },
                                            "ไม่ได้เตะมาเป็นปี (20%)"
                                        ),
                                        React.createElement(
                                            "option",
                                            { value: "8" },
                                            "เดี้ยงอยู่ (0%)"
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-horizontal card" },
                            React.createElement(
                                "div",
                                { className: "section-title text-center" },
                                "ข้อมูลการติดต่อ"
                            ),
                            React.createElement(TextInput, { ref: "inputEmail", type: "email", name: "อีเมล์", placeholder: "อีเมล์" }),
                            React.createElement(TextInput, { ref: "inputLineID", type: "text", name: "LINE ID", placeholder: "LINE ID" }),
                            React.createElement(TextInput, { ref: "inputMobile", type: "number", name: "โทรศัพท์", placeholder: "เช่น 0881234567" })
                        ),
                        React.createElement(
                            "div",
                            { className: "form-horizontal card increase-padding-bottom" },
                            React.createElement(
                                "div",
                                { className: "section-title text-center" },
                                "ประสบการณ์"
                            ),
                            React.createElement(InputCheckBox, { ref: "inputExpNearHome", title: "เตะเล่นแถวบ้าน" }),
                            React.createElement(InputCheckBox, { ref: "inputExpSchool", title: "นักฟุตบอลโรงเรียน" }),
                            React.createElement(InputCheckBox, { ref: "inputExpUniversity", title: "นักฟุตบอลมหาลัย" }),
                            React.createElement(InputCheckBox, { ref: "inputExpProvince", title: "นักฟุตบอลจังหวัด" }),
                            React.createElement(InputCheckBox, { ref: "inputExpTour", title: "นักฟุตบอลทีมอิสระเดินสาย" }),
                            React.createElement(InputCheckBox, { ref: "inputExpClub", title: "นักฟุตบอลสโมสร" }),
                            React.createElement(InputCheckBox, { ref: "inputExpNation", title: "นักฟุตบอลทีมชาติ" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-8" },
                        React.createElement(
                            "div",
                            { className: "form-horizontal" },
                            React.createElement(
                                "div",
                                { className: "card" },
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "div",
                                        { className: "section-title text-center" },
                                        "ตำแหน่งที่ชอบเล่น"
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-4" },
                                        React.createElement(
                                            "div",
                                            { className: "section-title-2 pos-title" },
                                            "กองหลัง"
                                        ),
                                        React.createElement(InputCheckBox, { ref: "inputPosCenterBack", title: "เซ็นเตอร์แบ็ค" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosSweeper", title: "สวีปเปอร์" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosFullBackL", title: "ฟูลแบ็คซ้าย" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosFullBackR", title: "ฟูลแบ็คขวา" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosWingBackL", title: "วิงแบ็คซ้าย" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosWingBackR", title: "วิงแบ็คขวา" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-4" },
                                        React.createElement(
                                            "div",
                                            { className: "section-title-2 pos-title" },
                                            "กองกลาง"
                                        ),
                                        React.createElement(InputCheckBox, { ref: "inputPosCenterMid", title: "เซ็นเตอร์มิดฟิลด์" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosDefMid", title: "มิดฟิลด์ตัวรับ" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosAttackMid", title: "มิดฟิลด์ตัวรุก" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosWideMid", title: "มิดฟิลด์ด้านกว้าง" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-4" },
                                        React.createElement(
                                            "div",
                                            { className: "section-title-2 pos-title" },
                                            "กองหน้า"
                                        ),
                                        React.createElement(InputCheckBox, { ref: "inputPosCenterForward", title: "เซ็นเตอร์ฟอร์เวิร์ด" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosSecondStriker", title: "กองหน้าตัวต่ำ" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosWingL", title: "ปีกซ้าย" }),
                                        React.createElement(InputCheckBox, { ref: "inputPosWingR", title: "ปีกขวา" }),
                                        React.createElement(
                                            "div",
                                            { className: "section-title-2 pos-title pos-title-2" },
                                            "ประตู"
                                        ),
                                        React.createElement(InputCheckBox, { ref: "inputPosGoal", title: "ผู้รักษาประตู" })
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "card" },
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "div",
                                        { className: "section-title text-center" },
                                        "ค่าตัว"
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-3" },
                                        React.createElement(InputRadio, { onSetTrue: this.disableCostHourBaht, ref: "inputCostFreeHelpField", name: "man_hour", title: "ฟรี" }),
                                        React.createElement(
                                            "div",
                                            { className: "man-hour-text" },
                                            "ช่วยออกค่าสนาม"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-3" },
                                        React.createElement(InputRadio, { onSetTrue: this.disableCostHourBaht, ref: "inputCostFreeNoHelpField", name: "man_hour", title: "ฟรี" }),
                                        React.createElement(
                                            "div",
                                            { className: "man-hour-text" },
                                            "ไม่ออกค่าสนาม"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-6 form-inline" },
                                        React.createElement(InputRadio, { onSetTrue: this.enableCostHourBaht, ref: "inputCostHour", name: "man_hour", title: "ชั่วโมงละ" }),
                                        React.createElement(
                                            "div",
                                            null,
                                            React.createElement(
                                                "label",
                                                { className: "radio-inline" },
                                                React.createElement("input", { ref: "inputCostHourBaht", type: "number", className: "form-control" }),
                                                " บาท"
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "hidden" },
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(InputTitle, { title: "สนามที่เล่นได้" }),
                                        React.createElement(
                                            "div",
                                            { className: "col-sm-8" },
                                            React.createElement(InputCheckBox, { ref: "inputFieldGrass", title: "หญ้าแท้" }),
                                            React.createElement(InputCheckBox, { ref: "inputFieldFakeGrass", title: "หญ้าเทียม" }),
                                            React.createElement(InputCheckBox, { ref: "inputFieldHard", title: "พื้นแข็ง (คอนกรีต, ฟุตซอล)" }),
                                            React.createElement(InputCheckBox, { ref: "inputFieldSand", title: "ทราย" }),
                                            React.createElement(InputCheckBox, { ref: "inputFieldClay", title: "ดิน" }),
                                            React.createElement(InputCheckBox, { ref: "inputFieldRain", title: "เปียกฝน" })
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(InputTitle, { title: "ขนาดทีมที่ชอบ" }),
                                        React.createElement(
                                            "div",
                                            { className: "col-sm-8" },
                                            React.createElement(InputCheckBox, { ref: "inputSize11", title: "ข้างละ 11 คน" }),
                                            React.createElement(InputCheckBox, { ref: "inputSize7_9", title: "ข้างละ 7-9 คน" }),
                                            React.createElement(InputCheckBox, { ref: "inputSize3_6", title: "ข้างละ 3-6 คน" }),
                                            React.createElement(InputCheckBox, { ref: "inputSize11up", title: "ข้างละ > 11 คน" })
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "card" },
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "div",
                                        { className: "section-title text-center" },
                                        "ช่วงเวลาที่น่าจะว่าง"
                                    ),
                                    React.createElement(
                                        "table",
                                        { className: "table table-striped" },
                                        React.createElement(
                                            "thead",
                                            null,
                                            React.createElement(
                                                "tr",
                                                null,
                                                React.createElement(
                                                    "th",
                                                    { className: "text-center" },
                                                    "เวลา"
                                                ),
                                                React.createElement(
                                                    "th",
                                                    { className: "text-center" },
                                                    "วันธรรมดา"
                                                ),
                                                React.createElement(
                                                    "th",
                                                    { className: "text-center" },
                                                    "วันเสาร์"
                                                ),
                                                React.createElement(
                                                    "th",
                                                    { className: "text-center" },
                                                    "วันอาทิตย์"
                                                ),
                                                React.createElement(
                                                    "th",
                                                    { className: "text-center" },
                                                    "วันหยุด"
                                                )
                                            )
                                        ),
                                        React.createElement(TimeList, null)
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "card hidden" },
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-12" },
                                        React.createElement("input", { ref: "inputYoutubeURL", type: "text", className: "form-control", placeholder: "url youtube แสดงทักษะการเล่น" })
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "card" },
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "div",
                                        { className: "section-title text-center" },
                                        "เลื่อนหมุดเพื่อกำหนดที่สะดวกเตะบอล"
                                    ),
                                    React.createElement("input", { type: "hidden", id: "inputAddress" }),
                                    React.createElement("input", { type: "hidden", id: "inputLat" }),
                                    React.createElement("input", { type: "hidden", id: "inputLong" }),
                                    React.createElement("div", { id: "locationPicker", style: locationStyle }),
                                    React.createElement(
                                        "button",
                                        { type: "button", onClick: this.updateCurrentLocation, className: "btn btn-default" },
                                        "ไปยังตำแหน่งของคุณ"
                                    ),
                                    ' ',
                                    this.state.locationStatus,
                                    React.createElement("br", null)
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "button-save text-center" },
                        React.createElement(
                            "button",
                            { type: "submit", onClick: this.saveData, className: "btn btn-primary btn-lg btn-tall" },
                            "บันทึกข้อมูลนักเตะ"
                        )
                    ),
                    React.createElement(DialogInfo, { ref: "dialogInfoSaveDone", title: "การบันทึกข้อมูลนักเตะ", message: "เรียบร้อยแล้ว", id: "dialogInfoSaveDone", action_message: "ตกลง" })
                )
            );
        } else {
            content = React.createElement(
                "div",
                { className: "container pad-nav" },
                React.createElement(
                    "h2",
                    null,
                    "Loading..."
                )
            );
        }

        return React.createElement(
            "div",
            null,
            React.createElement(Nav, { FB_userID: this.state.FB_userID }),
            content
        );
    }
});

var mTimeData = [{ Index: 0, Name: "9:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 1, Name: "10:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 2, Name: "11:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 3, Name: "12:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 4, Name: "13:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 5, Name: "14:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 6, Name: "15:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 7, Name: "16:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 8, Name: "17:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 9, Name: "18:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 10, Name: "19:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 11, Name: "20:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 12, Name: "21:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 13, Name: "22:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 14, Name: "23:00", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 15, Name: "เที่ยงคืน", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 16, Name: "ตี 1", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 17, Name: "ตี 2", Normal: 0, Sat: 0, Sun: 0, Special: 0 }, { Index: 18, Name: "ตี 3", Normal: 0, Sat: 0, Sun: 0, Special: 0 }];

var TimeList = React.createClass({
    displayName: "TimeList",

    render: function render() {
        var time_list = mTimeData.map((function (t) {
            return React.createElement(TimeNode, { key: t.Index, t: t });
        }).bind(this));
        return React.createElement(
            "tbody",
            { className: "text-center" },
            time_list
        );
    }
});

var TimeNode = React.createClass({
    displayName: "TimeNode",

    normalChanged: function normalChanged() {
        var t = this.props.t;
        var v = this.refs.inputNormal.checked;
        mTimeData[t.Index].Normal = v;
        this.props.t.Normal = v;
        this.forceUpdate();
    },
    satChanged: function satChanged() {
        var t = this.props.t;
        var v = this.refs.inputSat.checked;
        mTimeData[t.Index].Sat = v;
        this.props.t.Sat = v;
        this.forceUpdate();
    },
    sunChanged: function sunChanged() {
        var t = this.props.t;
        var v = this.refs.inputSun.checked;
        mTimeData[t.Index].Sun = v;
        this.props.t.Sun = v;
        this.forceUpdate();
    },
    specialChanged: function specialChanged() {
        var t = this.props.t;
        var v = this.refs.inputSpecial.checked;
        mTimeData[t.Index].Special = v;
        this.props.t.Special = v;
        this.forceUpdate();
    },
    render: function render() {
        var t = this.props.t;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                t.Name
            ),
            React.createElement(
                "td",
                null,
                React.createElement("input", { ref: "inputNormal", onChange: this.normalChanged, type: "checkbox", checked: t.Normal })
            ),
            React.createElement(
                "td",
                null,
                React.createElement("input", { ref: "inputSat", onChange: this.satChanged, type: "checkbox", checked: t.Sat })
            ),
            React.createElement(
                "td",
                null,
                React.createElement("input", { ref: "inputSun", onChange: this.sunChanged, type: "checkbox", checked: t.Sun })
            ),
            React.createElement(
                "td",
                null,
                React.createElement("input", { ref: "inputSpecial", onChange: this.specialChanged, type: "checkbox", checked: t.Special })
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
            { className: "checkbox" },
            React.createElement("input", { ref: "input", type: "checkbox" }),
            p.title
        );
    }
});

var InputRadio = React.createClass({
    displayName: "InputRadio",

    checkCallBack: function checkCallBack() {
        if (this.refs.input.checked && this.props.onSetTrue != undefined) {
            this.props.onSetTrue();
        }
    },
    setValue: function setValue(v) {
        this.refs.input.checked = v;
        this.checkCallBack();
    },
    getValue: function getValue() {
        return this.refs.input.checked ? 1 : 0;
    },
    render: function render() {
        var p = this.props;
        return React.createElement(
            "label",
            { className: "radio-inline" },
            React.createElement("input", { onChange: this.checkCallBack, ref: "input", type: "radio", name: p.name, value: p.value }),
            p.title
        );
    }
});

var TextInputInline = React.createClass({
    displayName: "TextInputInline",

    getText: function getText() {
        return this.refs.input.value;
    },
    setText: function setText(v) {
        this.refs.input.value = v;
    },
    render: function render() {
        var p = this.props;
        return React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
                "div",
                { className: "col-sm-12 form-inline" },
                p.name,
                " ",
                React.createElement("input", { ref: "input", type: "number", className: "form-control" }),
                " ",
                p.afterText
            )
        );
    }
});

var TextInput = React.createClass({
    displayName: "TextInput",

    getText: function getText() {
        return this.refs.input.value;
    },
    setText: function setText(v) {
        this.refs.input.value = v;
    },
    render: function render() {
        var p = this.props;
        var placeholder = p.placeholder;
        if (!placeholder || placeholder == "") {
            placeholder = p.name;
        }
        return React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(InputTitle, { title: p.name }),
            React.createElement(
                "div",
                { className: "col-sm-9 reduce-padding-left" },
                React.createElement("input", { ref: "input", type: p.type, className: "form-control", placeholder: placeholder })
            )
        );
    }
});

var InputTitle = React.createClass({
    displayName: "InputTitle",

    render: function render() {
        return React.createElement(
            "label",
            { className: "col-sm-3 control-label reduce-padding-right" },
            this.props.title
        );
    }
});

var ProfileImage = React.createClass({
    displayName: "ProfileImage",

    getInitialState: function getInitialState() {
        return {
            percent: 0,
            imageURL: ""
        };
    },
    setImageURL: function setImageURL(url) {
        if (url == "") {
            this.state.imageURL = "/img/test.jpg";
        } else {
            if (mIsHttps) this.state.imageURL = url.replace("http://", "https://") + "=s800";else this.state.imageURL = url + "=s800";
        }
        this.forceUpdate();
    },
    progressCall: function progressCall(e) {
        if (e.lengthComputable) {
            this.state.percent = Math.round(e.loaded / e.total * 100);
            this.forceUpdate();
        }
    },
    uploadImage: function uploadImage() {
        // http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
        // https://cloud.google.com/appengine/docs/go/blobstore/
        //var formData = new FormData($('#uploadImageForm')[0]);

        //var formData = new FormData(this.refs.uploadForm.getDOMNode());

        var token = $.cookie("token");
        var FB_userID = this.props.FB_userID;
        var formData = new FormData();
        formData.append("file", this.refs.file.files[0]);
        formData.append("token", token);
        formData.append("FB_userID", FB_userID);

        this.request = $.ajax({
            method: "POST",
            url: UploadURL,
            data: formData,
            dataType: 'json',
            xhr: (function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', this.progressCall, false);
                }
                return myXhr;
            }).bind(this),
            beforeSend: (function () {}).bind(this),
            success: (function (json) {
                if (json.Success == 1) {
                    UploadURL = json.NewUploadURL;
                    this.setImageURL(json.ImageURL);
                    this.state.percent = 0;
                    this.forceUpdate();
                }
            }).bind(this),
            error: (function (xhr, status, err) {
                console.log(xhr, status, err.toString());
            }).bind(this),
            cache: false,
            contentType: false,
            processData: false
        });
    },
    render: function render() {
        var imgWidth = { width: "100%" };
        var progressStyle = { width: this.state.percent + "%" };

        var progressDiv = '';
        if (this.state.percent > 0) {
            progressDiv = React.createElement(
                "div",
                { className: "progress" },
                React.createElement(
                    "div",
                    { className: "progress-bar", role: "progressbar", "aria-valuenow": this.state.percent, "aria-valuemin": "0", "aria-valuemax": "100", style: progressStyle },
                    this.state.percent,
                    "%"
                )
            );
        }
        return React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
                "div",
                { className: "card" },
                React.createElement("img", { style: imgWidth, src: this.state.imageURL, className: "img-rounded" }),
                React.createElement(
                    "form",
                    { ref: "uploadForm", encType: "multipart/form-data" },
                    React.createElement(
                        "span",
                        { className: "btn btn-success btn-file btn-green" },
                        "อัพโหลดรูปภาพ ",
                        React.createElement("input", { ref: "file", onChange: this.uploadImage, name: "file", type: "file" })
                    ),
                    progressDiv
                )
            )
        );
    }

});

ReactDOM.render(React.createElement(Me, null), document.getElementById('content'));

function setupBirthday(defaultDate) {
    $("#birthdayPicker").birthdayPicker({
        "defaultDate": defaultDate,
        "dateFormat": "littleEndian",
        "maxAge": 100,
        "sizeClass": "form-control"
    });
}
function getBirthdayValue() {
    var d = $('#birth\\[day\\] option:selected');
    var m = $('#birth\\[month\\] option:selected');
    var y = $('#birth\\[year\\] option:selected');

    if (d.val() != 0 && m.val() != 0 && y.val() != 0) {
        return m.text() + '/' + d.text() + '/' + (parseInt(y.text()) - 543);
    }
    return "";
}

function setupMap(lat, lng) {
    if (lat == 0 && lng == 0) {
        lat = 13.746801859638278;
        lng = 100.53487491607666;
    }
    $('#locationPicker').locationpicker({
        location: { latitude: lat, longitude: lng },
        radius: 5000,
        zoom: 12,
        inputBinding: {
            latitudeInput: $('#inputLat'),
            longitudeInput: $('#inputLong'),
            locationNameInput: $('#inputAddress')
        },
        scrollwheel: false
    });
}
// var mMapScrollOn = false;
//
// function enableScrollingWithMouseWheel() {
//     if(mMapScrollOn)
//         return;
//     $('#locationPicker').locationpicker('map').map.setOptions({ scrollwheel: true });
//     mMapScrollOn = true;
// }
//
// function disableScrollingWithMouseWheel() {
//     if(!mMapScrollOn)
//         return;
//     $('#locationPicker').locationpicker('map').map.setOptions({ scrollwheel: false });
//     mMapScrollOn = false;
// }
//
// $('body').on('mousedown', function(event) {
//     var clickedInsideMap = $(event.target).parents('#locationPicker').length > 0;
//
//     if(clickedInsideMap) {
//         enableScrollingWithMouseWheel();
//     }else{
//         disableScrollingWithMouseWheel();
//     }
// });
//
// $(window).scroll(function() {
//     disableScrollingWithMouseWheel();
// });