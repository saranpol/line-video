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



