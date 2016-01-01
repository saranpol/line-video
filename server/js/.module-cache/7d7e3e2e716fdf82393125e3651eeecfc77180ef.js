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
      "Test"
      )
    );
  }
});



React.render(
  React.createElement(ProductBox, null),
  document.getElementById('content')
);



