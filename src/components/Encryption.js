import React from "react";

class Encryption extends React.Component {
    constructor(props) {
        super(props);
        this.state = { disabled: false }
    }
    handleGameClik() {
        this.setState( {disabled: !this.state.disabled} )
    }
    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Private Key" aria-describedby="button-addon4" disabled={(this.state.disabled)?"disabled":""}/>
                <div className="input-group-append" id="button-addon4">
                    <button onClick = {this.handleGameClik.bind(this)} className="btn btn-outline-secondary" type="button">Button</button>
                </div>
            </div>
        );
    }
}

export default Encryption;
