var Me = React.createClass({displayName: "Me",
    getInitialState: function() {
        return {data: []
        };
    },
    loadProductsFromServer: function() {
    },
    componentDidMount: function() {
        //this.loadProductsFromServer();
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("button", {className: "btn btn-primary btn-lg", onClick: this.clickSave}, "SAVE")
            )
        );
    }
});



React.render(
    React.createElement(Me, null),
    document.getElementById('content')
);



