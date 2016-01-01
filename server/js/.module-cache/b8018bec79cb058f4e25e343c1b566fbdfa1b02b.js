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
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-4"}, 
                        React.createElement(ProfileImage, null), 

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
                            React.createElement(TextInput, {ref: "inputPhone", type: "number", name: "เบอร์มือถือ", placeholder: "เบอร์มือถือ เช่น 0881234567"}), 
                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement(InputTitle, {title: "วันเกิด"}), 
                                React.createElement("div", {className: "col-sm-10"}, 
                                    React.createElement("div", {className: "form-inline", id: "birthdayPicker"})
                                )
                            ), 

                            React.createElement("div", {className: "form-group"}, 
                                React.createElement(InputTitle, {title: "ตำแหน่งที่ชอบ"}), 
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
                                React.createElement(InputTitle, {title: "ประเภทสนาม"}), 
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
                                React.createElement(InputTitle, {title: "ขนาดทีม"}), 
                                React.createElement("div", {className: "col-sm-10"}, 
                                    React.createElement(InputCheckBox, {title: "ข้างละ 11 คน"}), 
                                    React.createElement(InputCheckBox, {title: "ข้างละ 7-9 คน"}), 
                                    React.createElement(InputCheckBox, {title: "ข้างละ 3-6 คน"}), 
                                    React.createElement(InputCheckBox, {title: "ข้างละ > 11 คน"})
                                )
                            ), 


            

                            React.createElement("div", {className: "form-group"}, 
                                React.createElement(InputTitle, {title: "ช่วงเวลา"}), 
                                React.createElement("div", {className: "col-sm-10"}, 
                                    React.createElement("p", {className: "form-control-static"}, "เช่น น่าจะว่าง 18:00น. - 20:00น. ก็ติ๊ก 18 19 20")
                                )
                            ), 
            
                            
            
                            React.createElement(InputTimeRange, {title: "วันธรรมดา"}), 
                            React.createElement(InputTimeRange, {title: "วันเสาร์"}), 
                            React.createElement(InputTimeRange, {title: "วันอาทิตย์"}), 
                            React.createElement(InputTimeRange, {title: "วันหยุด"})
            



                        )
                    ), 



                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "col-sm-12"}, 
                            React.createElement("h1", null, " "), 
                            React.createElement("button", {type: "submit", onClick: this.saveData, className: "btn btn-primary btn-lg btn-block"}, "บันทึกข้อมูลนักเตะ")
                        )
                    )

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
                    React.createElement("div", null, 
                        React.createElement(InputCheckBox, {title: "9"}), 
                        React.createElement(InputCheckBox, {title: "10"}), 
                        React.createElement(InputCheckBox, {title: "11"}), 
                        React.createElement(InputCheckBox, {title: "12"}), 
                        React.createElement(InputCheckBox, {title: "13"}), 
                        React.createElement(InputCheckBox, {title: "14"}), 
                        React.createElement(InputCheckBox, {title: "15"}), 
                        React.createElement(InputCheckBox, {title: "16"}), 
                        React.createElement(InputCheckBox, {title: "17"}), 
                        React.createElement(InputCheckBox, {title: "18"})
                    ), 
                    React.createElement("div", null, 
                        React.createElement(InputCheckBox, {title: "19"}), 
                        React.createElement(InputCheckBox, {title: "20"}), 
                        React.createElement(InputCheckBox, {title: "21"}), 
                        React.createElement(InputCheckBox, {title: "22"}), 
                        React.createElement(InputCheckBox, {title: "23"}), 
                        React.createElement(InputCheckBox, {title: "เที่ยงคืน"}), 
                        React.createElement(InputCheckBox, {title: "ตี 1"}), 
                        React.createElement(InputCheckBox, {title: "ตี 2"}), 
                        React.createElement(InputCheckBox, {title: "ตี 3"})
                    )
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
                React.createElement("div", {className: "col-sm-12 form-inline"}, 
                    p.name, " ", React.createElement("input", {ref: "input", type: "number", className: "form-control"}), " ", p.afterText
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
        };
    },
    progress: function(e) {
        if(e.lengthComputable){
            this.state.percent = e.loaded / e.total * 100;
            this.setState();
        }
    },
    uploadImage: function() {
        // Devide into new class for user image
        // http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
        // https://cloud.google.com/appengine/docs/go/blobstore/
        
        var formData = new FormData($('#ccc')[0]);
        //var formData = new FormData(this.refs.uploadForm.getDOMNode());
        // var formData = new FormData($("#uploadImageForm")[0]);
        
// this.request = $.ajax({
//             url: "get_user",
//             data: {
//                 token: $.cookie("token"),
//                 FB_userID: this.state.FB_userID,
//                 FB_accessToken: this.state.FB_accessToken,
//             },
//             dataType: 'json',
//             cache: false,
//             success: function(json) {
//                 this.state.gotData = true;
//                 this.setState();
                
//                 this.refs.inputFirstName.setText(json.FirstName);
//                 this.refs.inputLastName.setText(json.LastName);
//                 this.refs.inputEmail.setText(json.Email);
//                 setupBirthday(json.Birthday);
//                 setupMap();

//             }.bind(this),
//             error: function(xhr, status, err) {
//                 console.log(xhr, status, err.toString());
//             }.bind(this)
//         });

        console.log(formData);

        this.request = $.ajax({
            url: "upload",
            // Form data
            data: formData,
            // data: {
            //     ccc : "xxx"
            // },

            type: "POST",
            //dataType: 'json',
            xhr: function() {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){ // Check if upload property exists
                    myXhr.upload.addEventListener('progress', this.progress, false); // For handling the progress of the upload
                }
                return myXhr;
            }.bind(this),
            //Ajax events
            beforeSend: function(){
            }.bind(this),
            success: function(json) {
                console.log(json);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this),
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    },
    render: function() {
        var imgWidth = {width:"100%"};
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement("img", {style: imgWidth, src: "/img/test.jpg", className: "img-thumbnail"}), 
                React.createElement("form", {id: "uploadImageForm", ref: "uploadForm", enctype: "multipart/form-data"}, 
                    
                        "เปลี่ยนรูปของคุณ ", React.createElement("input", {name: "file", type: "file"}), 
                    React.createElement("span", {className: "btn btn-default btn-file"}
                    ), 
                    React.createElement("input", {type: "button", onClick: this.uploadImage, value: "Upload"}), 
                    this.state.percent
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
