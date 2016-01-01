var NavBar = React.createClass({displayName: "NavBar",
    render: function() {
        var p = this.props;
        return (
            React.createElement("label", {className: "checkbox-inline"}, React.createElement("input", {type: "checkbox"}), p.title)
        );
    }
});
