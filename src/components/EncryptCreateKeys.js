import React from "react";
import * as openpgp from "openpgp";
import './EncryptCreateKeys.css';


class EncryptCreateKeys extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            pubKey:null,
            privKey:null};
    }
    handleGameClik() {
        this.setState( {disabled: !this.state.disabled} )
    }
    async createKeyPair(){

        var { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
            userIds: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
            rsaBits:4096,
            passphrase: 'super long and hard to guess secret'           // protects the private key
        });

        this.setState({privKey:privateKeyArmored});
        this.setState({pubKey:publicKeyArmored});

        return {privKey:privateKeyArmored,pubKey:publicKeyArmored}
    }
    //showKeys(){
     //   if
   // }

    render(){
        return (
            <div className="container my-5">
                <p>
                    <a className="btn btn-dark" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Create Keys</a>
                </p>
                <div className="row">
                    <div className="col">
                        <div className="collapse" id="multiCollapseExample1">
                            <div className="card card-body bg-dark">

                                <p>Create keys:</p>
                                <button onClick = {()=>{this.handleGameClik.bind(this);this.createKeyPair();}} data-toggle="collapse" className="btn btn-secondary btn-sm" type="button" aria-expanded="false" aria-controls="keysCollapse" href="#keysCollapse">Generate Keys</button>

                                <a className={(this.state.privKey==null?"invisible":"")} >Private Key (Keep Safe!):</a>
                                <div className="my-3 mx-3 collapse shadow" id="keysCollapse" >

                                    <div className={(this.state.privKey==null?"":"d-none")} >
                                        <div className="spinner-border m-5" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>

                                    <p className="h6"><small>{this.state.privKey}</small></p>
                                </div>

                                <a className={(this.state.privKey==null?"invisible":"")} >Public Key (Can Share!):</a>
                                <div className="my-3 mx-3 collapse shadow" id="keysCollapse">

                                    <div className={(this.state.privKey==null?"":"d-none")} >
                                        <div className="spinner-border m-5" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>


                                    <p className="h6"><small>{this.state.pubKey}</small></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>












            </div>
        )
    }
}

export default EncryptCreateKeys;