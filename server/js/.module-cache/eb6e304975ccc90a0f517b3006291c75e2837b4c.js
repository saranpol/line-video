var ProductBox = React.createClass({displayName: "ProductBox",
  getInitialState: function() {
    var p = $.cookie("password_md5");
    var isLogin = !(p === undefined || p === null);
    return {data: [],
      page: 0,
      total: 0,
      total_page: 0,
      limit: 10,
      q: "",
      mode: "none",
      isLogin: isLogin,
      showAlertLogin: false
    };
  },
  loadProductsFromServer: function() {
    if(!this.state.isLogin)
      return;
    var s = this.state;
    this.request = $.ajax({
      url: "products",
      data: {offset: s.page*s.limit, 
        limit: s.limit,
        q: s.q,
        mode: s.mode,
        password_md5: $.cookie("password_md5")
      },
      dataType: 'json',
      cache: false,
      success: function(json) {
        if(json.Data != null)
          this.setState({data: json.Data,
            total: json.Total,
            total_page: Math.ceil(json.Total/this.state.limit)
          });
        else {
          this.setState({data: []});
          console.log(json)
        }
          
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(xhr, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
  },
  clearDataAndReloadProduct: function() {
    this.state.data = [];
    this.setState();
    this.loadProductsFromServer();
  },
  clickNext: function() {
    if(this.state.page + 1 < this.state.total_page){
      this.state.page += 1;  
      this.clearDataAndReloadProduct();
    }
  },
  clickPrev: function() {
    if(this.state.page - 1 >= 0) {
      this.state.page -= 1;
      this.clearDataAndReloadProduct();
    }
  },
  handleUserInput: function(q, m) {
    this.state.q = q;
    this.state.page = 0;
    this.state.total = 0;
    this.state.total_page = 0;
    this.state.mode = m;
    this.request.abort();
    this.clearDataAndReloadProduct();
  },
  clickLogin: function(e) {
    e.preventDefault();
    var password_md5 = CryptoJS.MD5(this.refs.password.getDOMNode().value).toString();
    this.request = $.ajax({
      url: "login",
      data: {password_md5: password_md5
      },
      method: "POST",
      dataType: 'json',
      cache: false,
      success: function(json) {
        if(json.Success == 1) {
          $.cookie("password_md5", password_md5, { expires: 100000 });
          this.state.isLogin = true;
          this.setState();
          this.loadProductsFromServer();
        } else {
          this.state.showAlertLogin = true;
          this.setState();
        }
          
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(xhr, status, err.toString());
      }.bind(this)
    });
  },
  clickLogout: function() {
    $.removeCookie("password_md5");
    this.state.isLogin = false;
    this.state.showAlertLogin = false;
    this.setState();
  },
  isMode: function(m) {
    return this.state.mode == m;
  },
  clickWebCSV: function() {
    var f = this.refs.webCSV.getDOMNode();
    var v = this.refs.webCSVPass.getDOMNode();
    v.name = "password_md5";
    v.value = $.cookie("password_md5");
    f.submit();
  },
  clickProductCSV: function() {
    var f = this.refs.productCSV.getDOMNode();
    var v = this.refs.productCSVPass.getDOMNode();
    v.name = "password_md5";
    v.value = $.cookie("password_md5");
    f.submit();
  },
  render: function() {
    var content;
    var page = this.state.page + 1;
    var hide = {display:"none"}
    if(this.state.isLogin){
      content = (React.createElement("div", {className: "productBox"}, 
        React.createElement("h1", null, "Products",  
          React.createElement("button", {className: "btn btn-xs btn-default", onClick: this.clickLogout}, "Logout"), 
          React.createElement("form", {style: hide, ref: "webCSV", method: "POST", action: "web_csv", target: "_blank"}, React.createElement("input", {ref: "webCSVPass", type: "hidden"})), 
          React.createElement("form", {style: hide, ref: "productCSV", method: "POST", action: "product_csv", target: "_blank"}, React.createElement("input", {ref: "productCSVPass", type: "hidden"})), 
          React.createElement("button", {className: "btn btn-xs btn-default", onClick: this.clickWebCSV}, "Web CSV"), 
          React.createElement("button", {className: "btn btn-xs btn-default", onClick: this.clickProductCSV}, "Product CSV")
        ), 
        React.createElement(SearchBar, {q: this.state.q, onUserInput: this.handleUserInput, isMode: this.isMode}), 
        React.createElement("button", {className: "btn btn-lg btn-default", onClick: this.clickPrev}, "Prev"), 
        React.createElement("button", {className: "btn btn-lg btn-default", onClick: this.clickNext}, "Next"), " ", React.createElement("span", {className: "currentPage"}, "page ", page, "/", this.state.total_page, " total ", this.state.total, " products"), 
        React.createElement(ProductList, {data: this.state.data})
      ));
    } else {
      var alertLogin;
      if(this.state.showAlertLogin)
        alertLogin = (React.createElement("div", {className: "alert alert-danger", role: "alert"}, "The password you entered is incorrect."));
      else
        alertLogin = ({});
      content = (React.createElement("form", {className: "form-signin", onSubmit: this.clickLogin}, 
        React.createElement("h2", {className: "form-signin-heading"}, "Please sign in"), 
        alertLogin, 
        React.createElement("label", {for: "inputPassword", className: "sr-only"}, "Password"), 
        React.createElement("input", {type: "password", id: "inputPassword", className: "form-control", placeholder: "Password", required: "", ref: "password"}), 
        React.createElement("button", {className: "btn btn-lg btn-primary btn-block", type: "submit"}, "Sign in")
      ));
    }
    return (
      React.createElement("div", null, 
      content
      )
    );
  }
});

var ProductList = React.createClass({displayName: "ProductList",
  render: function() {
    var productNodes = this.props.data.map(function (product) {
      return (
        React.createElement(Product, {product: product})
      );
    });
    return (
      React.createElement("div", {className: "productList"}, 
        productNodes
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


var WebList = React.createClass({displayName: "WebList",
  getInitialState: function() {
    return {isShowTextFieldAddWeb: false,
    };
  },
  callAPI: function(url, method, data) {
    this.request = $.ajax({
      url: url,
      data: data,
      method: method,
      dataType: 'json',
      cache: false,
      success: function(json) {
        this.props.webList = json.WebList;
        this.setState();
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(xhr, status, err.toString());
      }.bind(this)
    });
  },
  clickAdd: function() {
    var url = this.refs.addWebURL.getDOMNode().value;
    if(url == "")
      return;
    var data = {product_id: this.props.productId,
                url: url,
                password_md5: $.cookie("password_md5")
                };
    this.callAPI("web", "POST", data);
    this.clickCancelAddWeb();
    return false;
  },
  clickDelete: function(web_id) {
    var data = {product_id: this.props.productId,
                web_id: web_id,
                password_md5: $.cookie("password_md5")
                }
    this.callAPI("web?"+$.param(data), "DELETE", null);
  },
  clickShowTextField: function() {
    this.state.isShowTextFieldAddWeb = true;
    this.setState();
  },
  clickCancelAddWeb: function() {
    this.state.isShowTextFieldAddWeb = false;
    this.setState();
    return false;
  },
  handleSubmit: function(e) {
      e.preventDefault();
      this.clickAdd();
  },
  render: function() {
    var webNodes;
    if(this.props.webList == null){
      webNodes = (React.createElement("div", null, "No webList"));
    } else {
      webNodes = this.props.webList.map(function (web) {
        return (
          React.createElement(Web, {web: web, onDelete: this.clickDelete})
        );
      }, this);
    }

    var addWebArea;
    if(this.state.isShowTextFieldAddWeb) {
      addWebArea = (
        React.createElement("div", null, 
          React.createElement("form", {className: "addWebForm", onSubmit: this.handleSubmit}, 
            React.createElement("input", {type: "text", placeholder: "URL...", ref: "addWebURL"}), 
            React.createElement("button", {className: "btn btn-xs btn-success", onClick: this.clickAdd}, "Add Web"), 
            React.createElement("button", {className: "btn btn-xs btn-default", onClick: this.clickCancelAddWeb}, "Cancel")
          )
        ));

    }else{
      addWebArea = (React.createElement("button", {className: "btn btn-xs btn-default", onClick: this.clickShowTextField}, "Add Web"));
    }

    return (
      React.createElement("div", {className: "webList"}, 
        webNodes, 
        React.createElement("div", {className: "webListControl"}, 
          addWebArea
          
        )
      )
    )
  }
});


var Web = React.createClass({displayName: "Web",
  getInitialState: function() {
    return {isShowConfirmDelete: false,
    };
  },
  clickDelete: function() {
    this.props.onDelete(this.props.web.ID);
  },
  clickCancelDelete: function() {
    this.state.isShowConfirmDelete = false;
    this.setState();
  },
  clickX: function() {
    this.state.isShowConfirmDelete = true;
    this.setState();
  },
  render: function() {
    var w = this.props.web;
    var buttonDelete;
    var now = new Date(w.LastUpdate);
    var timeStr = $.format.date(now, 'yyyy/MM/dd HH:mm:ss');
    if(this.state.isShowConfirmDelete)
      buttonDelete = (React.createElement("span", null, React.createElement("button", {className: "btn btn-xs btn-danger", onClick: this.clickDelete}, "Confirm Delete"), 
        React.createElement("button", {className: "btn btn-xs btn-default", onClick: this.clickCancelDelete}, "Cancel")));
    else
      buttonDelete = (React.createElement("button", {className: "btn btn-xs btn-default", onClick: this.clickX}, "X"));
    return (
      React.createElement("div", {className: "web"}, 
        React.createElement("a", {target: "_blank", href: w.URL}, "LINK"), " ", w.Price, " บาท ", timeStr, " ", buttonDelete
      )
    );
  }
});





var SearchBar = React.createClass({displayName: "SearchBar",
    handleSubmit: function(e) {
      e.preventDefault();
    },
    handleChange: function() {
      var m;
      if(this.refs.radioNone.getDOMNode().checked)
        m = "none";
      else if(this.refs.radioZero.getDOMNode().checked)
        m = "zero";
      else if(this.refs.radioDiff.getDOMNode().checked)
        m = "diff";
      else if(this.refs.radioLower.getDOMNode().checked)
        m = "lower";
      else if(this.refs.radioHigher.getDOMNode().checked)
        m = "higher";
      else if(this.refs.radioNotUpdate.getDOMNode().checked)
        m = "not_update";
      this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value, m);
    },
    render: function() {
      return (
        React.createElement("form", {className: "searchBar", onSubmit: this.handleSubmit}, 
          React.createElement("input", {type: "text", placeholder: "Search...", value: this.props.q, ref: "filterTextInput", onChange: this.handleChange}), ' ', 
          React.createElement("input", {type: "radio", name: "mode", ref: "radioNone", onChange: this.handleChange, checked: this.props.isMode("none")}), " All", ' ', 
          React.createElement("input", {type: "radio", name: "mode", ref: "radioZero", onChange: this.handleChange, checked: this.props.isMode("zero")}), " Zero Price", ' ', 
          React.createElement("input", {type: "radio", name: "mode", ref: "radioDiff", onChange: this.handleChange, checked: this.props.isMode("diff")}), " Diff > 100", ' ', 
          React.createElement("input", {type: "radio", name: "mode", ref: "radioLower", onChange: this.handleChange, checked: this.props.isMode("lower")}), " Lower", ' ', 
          React.createElement("input", {type: "radio", name: "mode", ref: "radioHigher", onChange: this.handleChange, checked: this.props.isMode("higher")}), " Higher or Equal", ' ', 
          React.createElement("input", {type: "radio", name: "mode", ref: "radioNotUpdate", onChange: this.handleChange, checked: this.props.isMode("not_update")}), " Not Update", ' '
        )
      );
    }
});




React.render(
  React.createElement(ProductBox, null),
  document.getElementById('content')
);



