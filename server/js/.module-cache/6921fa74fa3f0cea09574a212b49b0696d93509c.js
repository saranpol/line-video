var Me = React.createClass({displayName: "Me",
    getInitialState: function() {
        var p = $.cookie("token");
        var isLogin = !(p === undefined || p === null);
        return {
            isLogin: isLogin,
            FB_login: false,
            FB_userID: "",
            FB_accessToken: "",
            gotData: false,
            locationStatus: "",
        };
    },
    componentDidMount: function() {
        if(!this.state.isLogin){
            window.location.href = "/";
            return;
        }
        initFacebook(this.didInitFacebook);
    },
    didInitFacebook: function() {
        FB.getLoginStatus(function(res) {
            if (res.status === 'connected') {
                this.state.FB_login = true;
                this.state.FB_userID = res.authResponse.userID;
                this.state.FB_accessToken = res.authResponse.accessToken;
            } else {
                this.state.FB_login = false;
            }
            this.setState();
            if(this.state.FB_login){
                this.updateMeData();
            }else{
                window.location.href = "/";
            }
        }.bind(this));
    },
    updateMeData: function() {
        // get user
        var s = this.state;
        this.request = $.ajax({
            url: "get_user",
            data: {
                token: $.cookie("token"),
                FB_userID: this.state.FB_userID,
                FB_accessToken: this.state.FB_accessToken,
            },
            dataType: 'json',
            cache: false,
            success: function(json) {
                this.state.gotData = true;
                this.setState();

                this.refs.inputFirstName.setText(json.FirstName);
                this.refs.inputLastName.setText(json.LastName);
                this.refs.inputEmail.setText(json.Email);
                this.refs.profileImage.setImageURL(json.ImageURL);
                setupBirthday(json.Birthday);
                setupMap();

            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this)
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
        }.bind(this));
    },
    saveData: function(e) {
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
            CostHourBaht: r.inputCostHourBaht.getDOMNode().value,

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

            TimeNormalDay9: r.inputTimeNormalDay.getValue(9),
            TimeNormalDay10: r.inputTimeNormalDay.getValue(10),
            TimeNormalDay11: r.inputTimeNormalDay.getValue(11),
            TimeNormalDay12: r.inputTimeNormalDay.getValue(12),
            TimeNormalDay13: r.inputTimeNormalDay.getValue(13),
            TimeNormalDay14: r.inputTimeNormalDay.getValue(14),
            TimeNormalDay15: r.inputTimeNormalDay.getValue(15),
            TimeNormalDay16: r.inputTimeNormalDay.getValue(16),
            TimeNormalDay17: r.inputTimeNormalDay.getValue(17),
            TimeNormalDay18: r.inputTimeNormalDay.getValue(18),
            TimeNormalDay19: r.inputTimeNormalDay.getValue(19),
            TimeNormalDay20: r.inputTimeNormalDay.getValue(20),
            TimeNormalDay21: r.inputTimeNormalDay.getValue(21),
            TimeNormalDay22: r.inputTimeNormalDay.getValue(22),
            TimeNormalDay23: r.inputTimeNormalDay.getValue(23),
            TimeNormalDay0: r.inputTimeNormalDay.getValue(0),
            TimeNormalDay1: r.inputTimeNormalDay.getValue(1),
            TimeNormalDay2: r.inputTimeNormalDay.getValue(2),
            TimeNormalDay3: r.inputTimeNormalDay.getValue(3),

            TimeSatDay9: r.inputTimeSatDay.getValue(9),
            TimeSatDay10: r.inputTimeSatDay.getValue(10),
            TimeSatDay11: r.inputTimeSatDay.getValue(11),
            TimeSatDay12: r.inputTimeSatDay.getValue(12),
            TimeSatDay13: r.inputTimeSatDay.getValue(13),
            TimeSatDay14: r.inputTimeSatDay.getValue(14),
            TimeSatDay15: r.inputTimeSatDay.getValue(15),
            TimeSatDay16: r.inputTimeSatDay.getValue(16),
            TimeSatDay17: r.inputTimeSatDay.getValue(17),
            TimeSatDay18: r.inputTimeSatDay.getValue(18),
            TimeSatDay19: r.inputTimeSatDay.getValue(19),
            TimeSatDay20: r.inputTimeSatDay.getValue(20),
            TimeSatDay21: r.inputTimeSatDay.getValue(21),
            TimeSatDay22: r.inputTimeSatDay.getValue(22),
            TimeSatDay23: r.inputTimeSatDay.getValue(23),
            TimeSatDay0: r.inputTimeSatDay.getValue(0),
            TimeSatDay1: r.inputTimeSatDay.getValue(1),
            TimeSatDay2: r.inputTimeSatDay.getValue(2),
            TimeSatDay3: r.inputTimeSatDay.getValue(3),

            TimeSunDay9: r.inputTimeSunDay.getValue(9),
            TimeSunDay10: r.inputTimeSunDay.getValue(10),
            TimeSunDay11: r.inputTimeSunDay.getValue(11),
            TimeSunDay12: r.inputTimeSunDay.getValue(12),
            TimeSunDay13: r.inputTimeSunDay.getValue(13),
            TimeSunDay14: r.inputTimeSunDay.getValue(14),
            TimeSunDay15: r.inputTimeSunDay.getValue(15),
            TimeSunDay16: r.inputTimeSunDay.getValue(16),
            TimeSunDay17: r.inputTimeSunDay.getValue(17),
            TimeSunDay18: r.inputTimeSunDay.getValue(18),
            TimeSunDay19: r.inputTimeSunDay.getValue(19),
            TimeSunDay20: r.inputTimeSunDay.getValue(20),
            TimeSunDay21: r.inputTimeSunDay.getValue(21),
            TimeSunDay22: r.inputTimeSunDay.getValue(22),
            TimeSunDay23: r.inputTimeSunDay.getValue(23),
            TimeSunDay0: r.inputTimeSunDay.getValue(0),
            TimeSunDay1: r.inputTimeSunDay.getValue(1),
            TimeSunDay2: r.inputTimeSunDay.getValue(2),
            TimeSunDay3: r.inputTimeSunDay.getValue(3),

            TimeSpecialDay9: r.inputTimeSpecialDay.getValue(9),
            TimeSpecialDay10: r.inputTimeSpecialDay.getValue(10),
            TimeSpecialDay11: r.inputTimeSpecialDay.getValue(11),
            TimeSpecialDay12: r.inputTimeSpecialDay.getValue(12),
            TimeSpecialDay13: r.inputTimeSpecialDay.getValue(13),
            TimeSpecialDay14: r.inputTimeSpecialDay.getValue(14),
            TimeSpecialDay15: r.inputTimeSpecialDay.getValue(15),
            TimeSpecialDay16: r.inputTimeSpecialDay.getValue(16),
            TimeSpecialDay17: r.inputTimeSpecialDay.getValue(17),
            TimeSpecialDay18: r.inputTimeSpecialDay.getValue(18),
            TimeSpecialDay19: r.inputTimeSpecialDay.getValue(19),
            TimeSpecialDay20: r.inputTimeSpecialDay.getValue(20),
            TimeSpecialDay21: r.inputTimeSpecialDay.getValue(21),
            TimeSpecialDay22: r.inputTimeSpecialDay.getValue(22),
            TimeSpecialDay23: r.inputTimeSpecialDay.getValue(23),
            TimeSpecialDay0: r.inputTimeSpecialDay.getValue(0),
            TimeSpecialDay1: r.inputTimeSpecialDay.getValue(1),
            TimeSpecialDay2: r.inputTimeSpecialDay.getValue(2),
            TimeSpecialDay3: r.inputTimeSpecialDay.getValue(3),

            // BodyWeight int
            // BodyHeight int
            // BodyFit int // 1 - 8

            // YoutubeURL string

            // Location appengine.GeoPoint

            // Created time.Time
            // Modified time.Time
        };
        console.log(data);
    },
    render: function() {
        var content;

        if(this.state.gotData){
            var locationStyle = {width:"100%", height:"360px"};

            content = (
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-4"}, 
                            React.createElement(ProfileImage, {ref: "profileImage", FB_userID: this.state.FB_userID}), 

                            React.createElement("div", {className: "form-horizontal"}, 
                                React.createElement(TextInputInline, {ref: "inputWeight", type: "number", name: "น้ำหนัก", afterText: "กก."}), 
                                React.createElement(TextInputInline, {ref: "inputHeight", type: "number", name: "ส่วนสูง", afterText: "ซม."}), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement("div", {className: "col-sm-12"}, 
                                        React.createElement("select", {className: "form-control"}, 
                                            React.createElement("option", null, "ความฟิต"), 
                                            React.createElement("option", null, "ฟิตซ้อมอย่างมืออาชีพ (100%)"), 
                                            React.createElement("option", null, "เตะเกือบทุกวัน (80%)"), 
                                            React.createElement("option", null, "เตะทุกอาทิตย์ (60%)"), 
                                            React.createElement("option", null, "เตะทุกเดือน (50%)"), 
                                            React.createElement("option", null, "ไม่ได้เตะมาหลายเดือน (40%)"), 
                                            React.createElement("option", null, "มีอาการบาดเจ็บเล็กน้อยแต่พอเล่นได้ (30%) "), 
                                            React.createElement("option", null, "ไม่ได้เตะมาเป็นปี (20%)"), 
                                            React.createElement("option", null, "เดี้ยงอยู่ (0%)")
                                        )
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement("div", {className: "col-sm-12"}, 
                                        React.createElement("input", {ref: "inputYoutubeURL", type: "text", className: "form-control", placeholder: "url youtube แสดงทักษะการเล่น"})
                                    )
                                ), 


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
                        )

                            )


                        ), 
                        React.createElement("div", {className: "col-md-8"}, 
                            React.createElement("div", {className: "form-horizontal"}, 
                                React.createElement(TextInput, {ref: "inputFirstName", type: "text", name: "ชื่อ"}), 
                                React.createElement(TextInput, {ref: "inputLastName", type: "text", name: "นามสกุล"}), 
                                React.createElement(TextInput, {ref: "inputNickName", type: "text", name: "ชื่อเล่น"}), 
                                React.createElement(TextInput, {ref: "inputEmail", type: "email", name: "อีเมล์"}), 
                                React.createElement(TextInput, {ref: "inputLineID", type: "text", name: "LINE ID"}), 
                                React.createElement(TextInput, {ref: "inputUsername", type: "text", name: "Username", placeholder: "Username จะใช้เป็นชื่อ url ด้วย เช่น www.nugtae.com/your_username"}), 
                                React.createElement(TextInput, {ref: "inputMobile", type: "number", name: "เบอร์มือถือ", placeholder: "เบอร์มือถือ เช่น 0881234567"}), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "วันเกิด"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement("div", {className: "form-inline", id: "birthdayPicker"})
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "ตำแหน่งที่ชอบ"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement(InputCheckBox, {ref: "inputPosGoal", title: "ผู้รักษาประตู"})
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "กองหลัง"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement(InputCheckBox, {ref: "inputPosCenterBack", title: "เซ็นเตอร์แบ็ค"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosSweeper", title: "สวีปเปอร์"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosFullBackL", title: "ฟูลแบ็คซ้าย"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosFullBackR", title: "ฟูลแบ็คขวา"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosWingBackL", title: "วิงแบ็คซ้าย"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosWingBackR", title: "วิงแบ็คขวา"})
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "กองกลาง"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement(InputCheckBox, {ref: "inputPosCenterMid", title: "เซ็นเตอร์มิดฟิลด์"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosDefMid", title: "มิดฟิลด์ตัวรับ"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosAttackMid", title: "มิดฟิลด์ตัวรุก"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosWideMid", title: "มิดฟิลด์ด้านกว้าง"})
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "กองหน้า"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement(InputCheckBox, {ref: "inputPosCenterForward", title: "เซ็นเตอร์ฟอร์เวิร์ด"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosSecondStriker", title: "กองหน้าตัวต่ำ"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosWingL", title: "ปีกซ้าย"}), 
                                        React.createElement(InputCheckBox, {ref: "inputPosWingR", title: "ปีกขวา"})
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "ค่าตัว"}), 
                                    React.createElement("div", {className: "col-sm-10 form-inline"}, 
                                        React.createElement(InputRadio, {ref: "inputCostFreeHelpField", name: "man_hour", title: "ฟรี ช่วยออกค่าสนาม"}), 
                                        React.createElement(InputRadio, {ref: "inputCostFreeNoHelpField", name: "man_hour", title: "ฟรี ไม่ออกค่าสนาม"}), 
                                        React.createElement(InputRadio, {ref: "inputCostHour", name: "man_hour", title: "ชั่วโมงละ"}), 
                                        React.createElement("label", {className: "radio-inline"}, React.createElement("input", {ref: "inputCostHourBaht", type: "number", className: "form-control"}), " บาท")
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "ประสบการณ์"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement("div", null, 
                                        React.createElement(InputCheckBox, {ref: "inputExpNearHome", title: "เตะเล่นแถวบ้าน"}), 
                                        React.createElement(InputCheckBox, {ref: "inputExpSchool", title: "นักฟุตบอลโรงเรียน"}), 
                                        React.createElement(InputCheckBox, {ref: "inputExpUniversity", title: "นักฟุตบอลมหาลัย"}), 
                                        React.createElement(InputCheckBox, {ref: "inputExpProvince", title: "นักฟุตบอลจังหวัด"})
                                        ), 
                                        React.createElement("div", null, 
                                        React.createElement(InputCheckBox, {ref: "inputExpTour", title: "นักฟุตบอลทีมอิสระเดินสาย"}), 
                                        React.createElement(InputCheckBox, {ref: "inputExpClub", title: "นักฟุตบอลสโมสร"}), 
                                        React.createElement(InputCheckBox, {ref: "inputExpNation", title: "นักฟุตบอลทีมชาติ"})
                                        )
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "สนามที่เล่นได้"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement(InputCheckBox, {ref: "inputFieldGrass", title: "หญ้าแท้"}), 
                                        React.createElement(InputCheckBox, {ref: "inputFieldFakeGrass", title: "หญ้าเทียม"}), 
                                        React.createElement(InputCheckBox, {ref: "inputFieldHard", title: "พื้นแข็ง (คอนกรีต, ฟุตซอล)"}), 
                                        React.createElement(InputCheckBox, {ref: "inputFieldSand", title: "ทราย"}), 
                                        React.createElement(InputCheckBox, {ref: "inputFieldClay", title: "ดิน"}), 
                                        React.createElement(InputCheckBox, {ref: "inputFieldRain", title: "เปียกฝน"})
                                    )
                                ), 

                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "ขนาดทีมที่ชอบ"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement(InputCheckBox, {ref: "inputSize11", title: "ข้างละ 11 คน"}), 
                                        React.createElement(InputCheckBox, {ref: "inputSize7_9", title: "ข้างละ 7-9 คน"}), 
                                        React.createElement(InputCheckBox, {ref: "inputSize3_6", title: "ข้างละ 3-6 คน"}), 
                                        React.createElement(InputCheckBox, {ref: "inputSize11up", title: "ข้างละ > 11 คน"})
                                    )
                                ), 




                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement(InputTitle, {title: "ช่วงเวลา"}), 
                                    React.createElement("div", {className: "col-sm-10"}, 
                                        React.createElement("p", {className: "form-control-static"}, "เช่น น่าจะว่าง 18:00น. - 20:00น. ก็ติ๊ก 18 19 20")
                                    )
                                ), 



                                React.createElement(InputTimeRange, {ref: "inputTimeNormalDay", title: "วันธรรมดา"}), 
                                React.createElement(InputTimeRange, {ref: "inputTimeSatDay", title: "วันเสาร์"}), 
                                React.createElement(InputTimeRange, {ref: "inputTimeSunDay", title: "วันอาทิตย์"}), 
                                React.createElement(InputTimeRange, {ref: "inputTimeSpecialDay", title: "วันหยุด"})




                            )
                        ), 



                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("div", {className: "col-sm-12"}, 
                                React.createElement("h1", null, " "), 
                                React.createElement("button", {type: "submit", onClick: this.saveData, className: "btn btn-primary btn-lg btn-block"}, "บันทึกข้อมูลนักเตะ")
                            )
                        )

                    )



                )
            );
        }else{
            content = (React.createElement("div", {className: "container"}, React.createElement("h1", null, "กำลังโหลดข้อมูล...")));
        }


        return (
            React.createElement("div", null, 
                React.createElement(Nav, {FB_userID: this.state.FB_userID}), 
                content
            )
        );
    }
});


var InputTimeRange = React.createClass({displayName: "InputTimeRange",
    checkValue: function(r) {
        alert("here");
        return r.getDOMNode().checked ? 1 : 0;
    },
    getValue: function(h) {
        var r = this.refs;
        switch(h){
            case 9: return this.checkValue(r.h9);
            case 10: return this.checkValue(r.h10);
            case 11: return this.checkValue(r.h11);
            case 12: return this.checkValue(r.h12);
            case 13: return this.checkValue(r.h13);
            case 14: return this.checkValue(r.h14);
            case 15: return this.checkValue(r.h15);
            case 16: return this.checkValue(r.h16);
            case 17: return this.checkValue(r.h17);
            case 18: return this.checkValue(r.h18);
            case 19: return this.checkValue(r.h19);
            case 20: return this.checkValue(r.h20);
            case 21: return this.checkValue(r.h21);
            case 22: return this.checkValue(r.h22);
            case 23: return this.checkValue(r.h23);
            case 0: return this.checkValue(r.h0);
            case 1: return this.checkValue(r.h1);
            case 2: return this.checkValue(r.h2);
            case 3: return this.checkValue(r.h3);
        }
        return 0;
    },
    render: function() {
        var p = this.props;
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement(InputTitle, {title: p.title}), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("div", null, 
                        React.createElement(InputCheckBox, {ref: "h9", title: "9"}), 
                        React.createElement(InputCheckBox, {ref: "h10", title: "10"}), 
                        React.createElement(InputCheckBox, {ref: "h11", title: "11"}), 
                        React.createElement(InputCheckBox, {ref: "h12", title: "12"}), 
                        React.createElement(InputCheckBox, {ref: "h13", title: "13"}), 
                        React.createElement(InputCheckBox, {ref: "h14", title: "14"}), 
                        React.createElement(InputCheckBox, {ref: "h15", title: "15"}), 
                        React.createElement(InputCheckBox, {ref: "h16", title: "16"}), 
                        React.createElement(InputCheckBox, {ref: "h17", title: "17"}), 
                        React.createElement(InputCheckBox, {ref: "h18", title: "18"})
                    ), 
                    React.createElement("div", null, 
                        React.createElement(InputCheckBox, {ref: "h19", title: "19"}), 
                        React.createElement(InputCheckBox, {ref: "h20", title: "20"}), 
                        React.createElement(InputCheckBox, {ref: "h21", title: "21"}), 
                        React.createElement(InputCheckBox, {ref: "h22", title: "22"}), 
                        React.createElement(InputCheckBox, {ref: "h23", title: "23"}), 
                        React.createElement(InputCheckBox, {ref: "h0", title: "เที่ยงคืน"}), 
                        React.createElement(InputCheckBox, {ref: "h1", title: "ตี 1"}), 
                        React.createElement(InputCheckBox, {ref: "h2", title: "ตี 2"}), 
                        React.createElement(InputCheckBox, {ref: "h3", title: "ตี 3"})
                    )
                )
            )
        );
    }
});

var InputCheckBox = React.createClass({displayName: "InputCheckBox",
    getValue: function() {
        return this.refs.input.getDOMNode().checked ? 1 : 0;
    },
    render: function() {
        var p = this.props;
        return (
            React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {ref: "input", type: "checkbox"}), p.title)
        );
    }
});

var InputRadio = React.createClass({displayName: "InputRadio",
    getValue: function() {
        return this.refs.input.getDOMNode().checked ? 1 : 0;
    },
    render: function() {
        var p = this.props;
        return (
            React.createElement("label", {className: "radio-inline"}, React.createElement("input", {ref: "input", type: "radio", name: p.name, value: p.value}), p.title)
        );
    }
});

var TextInputInline = React.createClass({displayName: "TextInputInline",
    getText: function() {
        return this.refs.input.getDOMNode().value;
    },
    setText: function(v) {
        this.refs.input.getDOMNode().value = v;
    },
    render: function() {
        var p = this.props;
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement("div", {className: "col-sm-12 form-inline"}, 
                    p.name, " ", React.createElement("input", {ref: "input", type: "number", className: "form-control"}), " ", p.afterText
                )
            )
        );
    }
});

var TextInput = React.createClass({displayName: "TextInput",
    getText: function() {
        return this.refs.input.getDOMNode().value;
    },
    setText: function(v) {
        this.refs.input.getDOMNode().value = v;
    },
    render: function() {
        var p = this.props;
        var placeholder = p.placeholder;
        if(!placeholder || placeholder == ""){
            placeholder = p.name;
        }
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement(InputTitle, {title: p.name}), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("input", {ref: "input", type: p.type, className: "form-control", placeholder: placeholder})
                )
            )
        );
    }
});

var InputTitle = React.createClass({displayName: "InputTitle",
    render: function() {
        return (
            React.createElement("label", {className: "col-sm-2 control-label"}, this.props.title)
        );
    }
});


var ProfileImage = React.createClass({displayName: "ProfileImage",
    getInitialState: function() {
        return {
            percent: 0,
            imageURL: "",
        };
    },
    setImageURL: function(url) {
        if(url==""){
            this.state.imageURL = "/img/test.jpg";
        }else{
            this.state.imageURL = url + "=s800";
        }
        this.setState();
    },
    progressCall: function(e) {
        if(e.lengthComputable){
            this.state.percent = Math.round(e.loaded / e.total * 100);
            this.setState();
        }
    },
    uploadImage: function() {
        // http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
        // https://cloud.google.com/appengine/docs/go/blobstore/
        //var formData = new FormData($('#uploadImageForm')[0]);

        //var formData = new FormData(this.refs.uploadForm.getDOMNode());

        var token = $.cookie("token");
        var FB_userID = this.props.FB_userID;
        var formData = new FormData();
        formData.append("file", this.refs.file.getDOMNode().files[0]);
        formData.append("token", token);
        formData.append("FB_userID", FB_userID);

        this.request = $.ajax({
            url: UploadURL,
            data: formData,
            type: "POST",
            dataType: 'json',
            xhr: function() {
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress', this.progressCall, false);
                }
                return myXhr;
            }.bind(this),
            beforeSend: function(){
            }.bind(this),
            success: function(json) {
                if(json.Success == 1){
                    UploadURL = json.NewUploadURL;
                    this.setImageURL(json.ImageURL);
                    this.state.percent = 0;
                    this.setState();
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this),
            cache: false,
            contentType: false,
            processData: false
        });
    },
    render: function() {
        var imgWidth = {width:"100%"};
        var progressStyle = {width:this.state.percent+"%"}

        var progressDiv = ('');
        if(this.state.percent > 0){
            progressDiv = (
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {className: "progress-bar", role: "progressbar", "aria-valuenow": this.state.percent, "aria-valuemin": "0", "aria-valuemax": "100", style: progressStyle}, 
                        this.state.percent, "%"
                    )
                ));
        }
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement("img", {style: imgWidth, src: this.state.imageURL, className: "img-thumbnail"}), 

                React.createElement("form", {ref: "uploadForm", enctype: "multipart/form-data"}, 
                    React.createElement("span", {className: "btn btn-default btn-file"}, 
                        "เปลี่ยนรูปของคุณ ", React.createElement("input", {ref: "file", onChange: this.uploadImage, name: "file", type: "file"})
                    ), 
                    progressDiv
                )
            )
        );
    }

});








React.render(
    React.createElement(Me, null),
    document.getElementById('content')
);


function setupBirthday(defaultDate) {
    $("#birthdayPicker").birthdayPicker({
        "defaultDate": defaultDate,
        "dateFormat" : "littleEndian",
        "maxAge": 100,
        "sizeClass": "form-control"
    });
}
function getBirthdayValue() {
  var d = $('#birth\\[day\\] option:selected');
  var m = $('#birth\\[month\\] option:selected');
  var y = $('#birth\\[year\\] option:selected');

  if(d.val() != 0 && m.val() != 0 && y.val() != 0){
    return m.text() + '/' + d.text() + '/' + (parseInt(y.text()) - 543);
  }
  return "";
}



function setupMap() {
    $('#locationPicker').locationpicker({
        location: {latitude: 13.746801859638278, longitude: 100.53487491607666},
        radius: 5000,
        zoom: 12,
        inputBinding: {
            latitudeInput: $('#inputLat'),
            longitudeInput: $('#inputLong'),
            locationNameInput: $('#inputAddress')
        }
    });
}
