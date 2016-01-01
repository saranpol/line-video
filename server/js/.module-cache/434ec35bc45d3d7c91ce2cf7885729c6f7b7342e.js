var Index = React.createClass({displayName: "Index",
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
    // if(!this.state.isLogin)
    //   return;
    // var s = this.state;
    // this.request = $.ajax({
    //   url: "products",
    //   data: {offset: s.page*s.limit, 
    //     limit: s.limit,
    //     q: s.q,
    //     mode: s.mode,
    //     password_md5: $.cookie("password_md5")
    //   },
    //   dataType: 'json',
    //   cache: false,
    //   success: function(json) {
    //     if(json.Data != null)
    //       this.setState({data: json.Data,
    //         total: json.Total,
    //         total_page: Math.ceil(json.Total/this.state.limit)
    //       });
    //     else {
    //       this.setState({data: []});
    //       console.log(json)
    //     }
          
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.log(xhr, status, err.toString());
    //   }.bind(this)
    // });
  },
  componentDidMount: function() {
    //this.loadProductsFromServer();
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
  React.createElement(Index, null),
  document.getElementById('content')
);



