var Me = React.createClass({displayName: "Me",
    getInitialState: function() {
        return {
            FB_login: false,
            FB_userID: 0,
            FB_accessToken: "",
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
                console.log(this.state.FB_userID);
                console.log(this.state.FB_accessToken);
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
            url: "get_user",
            data: {
                FB_userID: this.state.FB_userID,
                FB_accessToken: this.state.FB_accessToken,
            },
            dataType: 'json',
            cache: false,
            success: function(json) {
                //console.log(json)
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
    render: function() {
        var locationStyle = {width:"100%", height:"400px"};
        var formContent = (
                React.createElement("form", {className: "form-horizontal"}, 
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
                            React.createElement("div", null, 
                                React.createElement(InputCheckBox, {title: "ผู้รักษาประตู"})
                            )
                        )
                    ), 


                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองหลัง"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", null, 
                                React.createElement(InputCheckBox, {title: "เซ็นเตอร์แบ็ค"}), 
                                React.createElement(InputCheckBox, {title: "สวีปเปอร์"}), 
                                React.createElement(InputCheckBox, {title: "ฟูลแบ็คซ้าย"}), 
                                React.createElement(InputCheckBox, {title: "ฟูลแบ็คขวา"}), 
                                React.createElement(InputCheckBox, {title: "วิงแบ็คซ้าย"}), 
                                React.createElement(InputCheckBox, {title: "วิงแบ็คขวา"})
                            )
                        )
                    ), 
   
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองกลาง"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", null, 
                                React.createElement(InputCheckBox, {title: "เซ็นเตอร์มิดฟิลด์"}), 
                                React.createElement(InputCheckBox, {title: "มิดฟิลด์ตัวรับ"}), 
                                React.createElement(InputCheckBox, {title: "มิดฟิลด์ตัวรุก"}), 
                                React.createElement(InputCheckBox, {title: "มิดฟิลด์ด้านกว้าง"})
                            )
                        )
                    ), 
                    
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองหน้า"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", null, 
                                React.createElement(InputCheckBox, {title: "เซ็นเตอร์ฟอร์เวิร์ด"}), 
                                React.createElement(InputCheckBox, {title: "กองหน้าตัวต่ำ"}), 
                                React.createElement(InputCheckBox, {title: "ปีกซ้าย"}), 
                                React.createElement(InputCheckBox, {title: "ปีกขวา"})
                            )
                        )
                    ), 


                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "บริเวณที่สะดวกเตะบอล"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("input", {type: "hidden", id: "inputAddress"}), 
                            React.createElement("input", {type: "hidden", id: "inputLat"}), 
                            React.createElement("input", {type: "hidden", id: "inputLong"}), 
                            React.createElement("div", {id: "locationPicker", style: locationStyle})
                        )
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                            React.createElement("button", {type: "submit", className: "btn btn-primary btn-lg"}, "Save")
                        )
                    )
                )
            );
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "ข้อมูลนักเตะ"), 
                formContent
            )
        );
    }
});


var InputCheckBox = React.createClass({displayName: "InputCheckBox",
    render: function() {
        var p = this.props;
        return (
            React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, p.title))
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

    navigator.geolocation.getCurrentPosition(function(position) {
      // You can set it the plugin
      $('#locationPicker').locationpicker('location', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
}




