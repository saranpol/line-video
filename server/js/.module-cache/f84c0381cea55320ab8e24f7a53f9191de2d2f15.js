var Me = React.createClass({displayName: "Me",
    getInitialState: function() {
        return {
            FB_login: false,
        };
    },
    componentDidMount: function() {
        initFacebook(this.didInitFacebook);
    },
    didInitFacebook: function() {
        FB.getLoginStatus(function(res) {
            if (res.status === 'connected') {
                this.state.FB_login = true;
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
        FB.api('/me?fields=first_name,last_name,email,birthday', function(res) {
            console.log('Successful login for: ' + JSON.stringify(res));
            this.refs.inputFirstName.setText(res.first_name);
            this.refs.inputLastName.setText(res.last_name);
            this.refs.inputEmail.setText(res.email);
            setupBirthday();
            setupMap();
        }.bind(this));
    },
    render: function() {
        var locationStyle = {width:"100%", height:"200px"};
        return (
            React.createElement("div", null, 
                React.createElement("form", {className: "form-horizontal"}, 
                    React.createElement(TextInput, {ref: "inputFirstName", type: "text", name: "ชื่อ"}), 
                    React.createElement(TextInput, {ref: "inputLastName", type: "text", name: "นามสกุล"}), 
                    React.createElement(TextInput, {ref: "inputNickName", type: "text", name: "ชื่อเล่น"}), 
                    React.createElement(TextInput, {ref: "inputEmail", type: "email", name: "อีเมล์"}), 
                    React.createElement(TextInput, {ref: "inputLineID", type: "text", name: "LINE ID"}), 
                    React.createElement(TextInput, {ref: "inputUsername", type: "text", name: "Username", placeholder: "Username จะใช้เป็นชื่อ url ด้วย เช่น www.nugtae.com/your_username"}), 
                    React.createElement(TextInput, {ref: "inputPassword", type: "password", name: "Password", placeholder: "Password ใส่เฉพาะครั้งแรก หรือเมื่อจะตั้งใหม่"}), 
                    React.createElement(TextInput, {ref: "inputPhone", type: "number", name: "เบอร์มือถือ", placeholder: "เบอร์มือถือ เช่น 0881234567"}), 
                    
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "วันเกิด"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", {className: "form-inline", id: "birthdayPicker"})
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
                        React.createElement(InputTitle, {title: "ตำแหน่งที่ชอบเล่น"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", null, 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "ผู้รักษาประตู"))
                            )
                        )
                    ), 


                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองหลัง"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", null, 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "เซ็นเตอร์แบ็ค")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "สวีปเปอร์")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "ฟูลแบ็คซ้าย")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "ฟูลแบ็คขวา")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "วิงแบ็คซ้าย")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "วิงแบ็คขวา"))
                            )
                        )
                    ), 
   
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองกลาง"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", null, 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "เซ็นเตอร์มิดฟิลด์")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "มิดฟิลด์ตัวรับ")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "มิดฟิลด์ตัวรุก")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "มิดฟิลด์ด้านกว้าง"))
                            )
                        )
                    ), 
                    
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(InputTitle, {title: "กองหน้า"}), 
                        React.createElement("div", {className: "col-sm-10"}, 
                            React.createElement("div", null, 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "เซ็นเตอร์ฟอร์เวิร์ด")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "กองหน้าตัวต่ำ")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "ปีกซ้าย")), 
                                React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}, "ปีกขวา"))
                            )
                        )
                    ), 


                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                            React.createElement("button", {type: "submit", className: "btn btn-primary btn-lg"}, "Save")
                        )
                    )
                )
            )
        );
    }
});


var InputCheckBox = React.createClass({displayName: "InputCheckBox",
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


function setupBirthday() {
    $("#birthdayPicker").birthdayPicker({
        "defaultDate": "02/24/1983",
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




