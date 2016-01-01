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
        };
    },
    componentDidMount: function() {
        this.updateData();
        initFacebook(this.didInitFacebook);
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
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement(Nav, {FB_userID: this.state.FB_userID}), 
                React.createElement("div", {className: "container"}, 
                    React.createElement(ResultList, {data: this.state.userList})
                )
            )
        );
    }
});

var ResultList = React.createClass({displayName: "ResultList",
    render: function() {
        var userNodes = this.props.data.map(function (user) {
            return (
                React.createElement(Product, {product: product})
            );
        });
        return (
            React.createElement("div", {className: "userList"}, 
                userNodes
            )
        );
    }
});

var Product = React.createClass({displayName: "Product",
  render: function() {
    //var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

    var p = this.props.product;
    return (
      React.createElement("div", {className: "product"}, 
        React.createElement("h4", {className: "productTitle"}, 
        p.ID, ". ", p.Brand, " ", p.Type, " ", p.TypeDetail, " ", p.TypeSize, " ", p.TypeSpecie, " ", p.PackageSize, " ", p.PackageUnit, " ", p.BarCode, " ", p.ItemNo, " ", p.Price, " บาท"
        ), 
        React.createElement(WebList, {webList: p.WebList, productId: p.ID})
      )
    );

    //<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
  }
});



React.render(
    React.createElement(Search, null),
    document.getElementById('content')
);