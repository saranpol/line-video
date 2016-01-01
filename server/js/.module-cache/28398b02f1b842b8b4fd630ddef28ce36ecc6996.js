var Me = React.createClass({displayName: "Me",
    getInitialState: function() {
        return {
            FB_login: false,
            FB_userID: 0,
            FB_accessToken: "",
            gotData: false,
        };
    },
    componentDidMount: function() {
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
            }
        }.bind(this));
    },
    updateMeData: function() {
        // get user
        var s = this.state;
        this.request = $.ajax({
            // url: "get_user",
            url: "get_user_test",
            data: {
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
        setCurrentLocation();
    },
    saveData: function(e) {
        e.preventDefault();
    },
    render: function() {
        var content;

        if(this.state.gotData){
            var locationStyle = {width:"100%", height:"400px"};
            content = (
                React.createElement("form", {className: "form-horizontal", onSubmit: this.saveData}, 
                    React.createElement(TextInput, {ref: "inputFirstName", type: "text", name: "ชื่อ"}), 
                    React.createElement(TextInput, {ref: "inputLastName", type: "text", name: "นามสกุล"}), 
                    React.createElement(TextInput, {ref: "inputNickName", type: "text", name: "ชื่อเล่น"}), 
                    React.createElement(TextInput, {ref: "inputEmail", type: "email", name: "อีเมล์"}), 
                    React.createElement(TextInput, {ref: "inputLineID", type: "text", name: "LINE ID"}), 
                    React.createElement(TextInput, {ref: "inputUsername", type: "text", name: "Username", placeholder: "Username จะใช้เป็นชื่อ url ด้วย เช่น www.nugtae.com/your_username"}), 
                    React.createElement(TextInput, {ref: "inputPhone", type: "number", name: "เบอร์มือถือ", placeholder: "เบอร์มือถือ เช่น 0881234567"}), 
                    
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "วันเกิด"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", {className: "form-inline", id: "birthdayPicker"})
                        )
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "ตำแหน่งที่ชอบเล่น"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement(InputCheckBox, {title: "ผู้รักษาประตู"})
                        )
                    ), 


                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองหลัง"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement(InputCheckBox, {title: "เซ็นเตอร์แบ็ค"}), 
                            React.createElement(InputCheckBox, {title: "สวีปเปอร์"}), 
                            React.createElement(InputCheckBox, {title: "ฟูลแบ็คซ้าย"}), 
                            React.createElement(InputCheckBox, {title: "ฟูลแบ็คขวา"}), 
                            React.createElement(InputCheckBox, {title: "วิงแบ็คซ้าย"}), 
                            React.createElement(InputCheckBox, {title: "วิงแบ็คขวา"})
                        )
                    ), 
   
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองกลาง"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement(InputCheckBox, {title: "เซ็นเตอร์มิดฟิลด์"}), 
                            React.createElement(InputCheckBox, {title: "มิดฟิลด์ตัวรับ"}), 
                            React.createElement(InputCheckBox, {title: "มิดฟิลด์ตัวรุก"}), 
                            React.createElement(InputCheckBox, {title: "มิดฟิลด์ด้านกว้าง"})
                        )
                    ), 
                    
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองหน้า"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement(InputCheckBox, {title: "เซ็นเตอร์ฟอร์เวิร์ด"}), 
                            React.createElement(InputCheckBox, {title: "กองหน้าตัวต่ำ"}), 
                            React.createElement(InputCheckBox, {title: "ปีกซ้าย"}), 
                            React.createElement(InputCheckBox, {title: "ปีกขวา"})
                        )
                    ), 


                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "ค่าตัว"}), 
                        React.createElement("div", {className: "col-sm-10 form-inline"}, 
                                React.createElement(InputRadio, {name: "man_hour", value: "-1", title: "ฟรี ช่วยออกค่าสนาม"}), 
                                React.createElement(InputRadio, {name: "man_hour", value: "0", title: "ฟรี ไม่ออกค่าสนาม"}), 
                                React.createElement(InputRadio, {name: "man_hour", value: "1", title: "ชั่วโมงละ"}), 
                                React.createElement("label", {className: "radio-inline"}, React.createElement("input", {type: "number", className: "form-control"}), " บาท")
                        )
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "ประสบการณ์"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", null, 
                            React.createElement(InputCheckBox, {title: "เตะเล่นแถวบ้าน"}), 
                            React.createElement(InputCheckBox, {title: "นักฟุตบอลโรงเรียน"}), 
                            React.createElement(InputCheckBox, {title: "นักฟุตบอลมหาลัย"}), 
                            React.createElement(InputCheckBox, {title: "นักฟุตบอลจังหวัด"})
                            ), 
                            React.createElement("div", null, 
                            React.createElement(InputCheckBox, {title: "นักฟุตบอลทีมอิสระเดินสาย"}), 
                            React.createElement(InputCheckBox, {title: "นักฟุตบอลสโมสร"}), 
                            React.createElement(InputCheckBox, {title: "นักฟุตบอลทีมชาติ"})
                            )
                        )
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "ประเภทสนามที่เล่นได้"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement(InputCheckBox, {title: "หญ้าแท้"}), 
                            React.createElement(InputCheckBox, {title: "หญ้าเทียม"}), 
                            React.createElement(InputCheckBox, {title: "พื้นแข็ง (คอนกรีต, ฟุตซอล)"}), 
                            React.createElement(InputCheckBox, {title: "ทราย"}), 
                            React.createElement(InputCheckBox, {title: "ดิน"}), 
                            React.createElement(InputCheckBox, {title: "เปียกฝน"})
                        )
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "ขนาดทีมที่อยากเล่น"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement(InputCheckBox, {title: "ข้างละ 11 คน"}), 
                            React.createElement(InputCheckBox, {title: "ข้างละ 7-9 คน"}), 
                            React.createElement(InputCheckBox, {title: "ข้างละ 3-6 คน"}), 
                            React.createElement(InputCheckBox, {title: "ข้างละ > 11 คน"})
                        )
                    ), 



                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "ความฟิต"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("select", {className: "form-control"}, 
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


                    React.createElement(TextInputInline, {ref: "inputWeight", type: "number", name: "น้ำหนัก", afterText: "กก."}), 

                    React.createElement(TextInputInline, {ref: "inputHeight", type: "number", name: "ส่วนสูง", afterText: "ซม."}), 
                    React.createElement(TextInput, {ref: "inputYoutubeURL", type: "text", name: "url youtube", placeholder: "url youtube แสดงทักษะการเล่น"}), 

   

    
    

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "ช่วงเวลาที่น่าจะว่าง"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("p", {className: "form-control-static"}, "ใน 1 สัปดาห์ เช่น ว่าง 18:00น. - 20:00น. ก็ติ๊ก 18 19 20")
                        )
                    ), 
    
                    
    
                    React.createElement(InputTimeRange, {title: "วันธรรมดา"}), 
                    React.createElement(InputTimeRange, {title: "วันเสาร์"}), 
                    React.createElement(InputTimeRange, {title: "วันอาทิตย์"}), 
                    React.createElement(InputTimeRange, {title: "วันหยุด"}), 
    

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "บริเวณที่สะดวกเตะบอล"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("input", {type: "hidden", id: "inputAddress"}), 
                            React.createElement("input", {type: "hidden", id: "inputLat"}), 
                            React.createElement("input", {type: "hidden", id: "inputLong"}), 
                            React.createElement("div", {id: "locationPicker", style: locationStyle}), 
                            React.createElement("button", {type: "button", onClick: this.updateCurrentLocation, className: "btn btn-default"}, "ไปยังตำแหน่งปัจจุบันของท่าน"), " (ท่านอาจจะต้องกดอนุญาตให้ใช้ตำแหน่งด้วย) ท่านสามารถเลื่อนหมุดบนแผนที่เพื่อเปลี่ยนตำแหน่ง"
                        )
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                            React.createElement("button", {type: "submit", className: "btn btn-primary btn-lg"}, "บันทึกข้อมูลนักเตะ")
                        )
                    ), 

                    "รูปถ่ายเต็มตัว แนวตั้ง 3:4"
                )
            );
        }else{
            content = (React.createElement("h1", null, "กำลังโหลดข้อมูล..."));
        }


        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "ข้อมูลนักเตะ"), 
                content
            )
        );
    }
});


var InputTimeRange = React.createClass({displayName: "InputTimeRange",
    render: function() {
        var p = this.props;
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement(InputTitle, {title: p.title}), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement(InputCheckBox, {title: "9"}), 
                    React.createElement(InputCheckBox, {title: "10"}), 
                    React.createElement(InputCheckBox, {title: "11"}), 
                    React.createElement(InputCheckBox, {title: "12"}), 
                    React.createElement(InputCheckBox, {title: "13"}), 
                    React.createElement(InputCheckBox, {title: "14"}), 
                    React.createElement(InputCheckBox, {title: "15"}), 
                    React.createElement(InputCheckBox, {title: "16"}), 
                    React.createElement(InputCheckBox, {title: "17"}), 
                    React.createElement(InputCheckBox, {title: "18"}), 
                    React.createElement(InputCheckBox, {title: "19"}), 
                    React.createElement(InputCheckBox, {title: "20"}), 
                    React.createElement(InputCheckBox, {title: "21"}), 
                    React.createElement(InputCheckBox, {title: "22"}), 
                    React.createElement(InputCheckBox, {title: "23"}), 
                    React.createElement(InputCheckBox, {title: "0"}), 
                    React.createElement(InputCheckBox, {title: "1"}), 
                    React.createElement(InputCheckBox, {title: "2"}), 
                    React.createElement(InputCheckBox, {title: "3"})
                )
            )
        );
    }
});

var InputCheckBox = React.createClass({displayName: "InputCheckBox",
    render: function() {
        var p = this.props;
        return (
            React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}), p.title)
        );
    }
});

var InputRadio = React.createClass({displayName: "InputRadio",
    render: function() {
        var p = this.props;
        return (
            React.createElement("label", {className: "radio-inline"}, React.createElement("input", {type: "radio", name: p.name, value: p.value}), p.title)
        );
    }
});

var TextInputInline = React.createClass({displayName: "TextInputInline",
    setText: function(v) {
        this.refs.input.getDOMNode().value = v;
    },
    render: function() {
        var p = this.props;
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement(InputTitle, {title: p.name}), 
                React.createElement("div", {className: "col-sm-10 form-inline"}, 
                    React.createElement("input", {ref: "input", type: "number", className: "form-control"}), " ", p.afterText
                )
            )
        );
    }
});

var TextInput = React.createClass({displayName: "TextInput",
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
                    React.createElement("input", {ref: "input", type: p.type, className: "form-control", placeholder: placeholder, value: p.value})
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

function setCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      // You can set it the plugin
      $('#locationPicker').locationpicker('location', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
}




