import React from "react";
const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp

class Encryption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            encryptedData:null,
            decryptedData:null,
            input:null,
            key:null};
    }
    handleGameClik() {
        this.setState( {disabled: !this.state.disabled} )
    }
    disabledInput(){
        if(this.state.disabled){
            return (<input type="text" id="disabledTextInput" onPaste={this.handleChange.bind(this) } onChange={ this.handleChange.bind(this) } className="form-control" placeholder="Private/Public Key" aria-describedby="button-addon4" disabled/>)
        }else{
            return (<input type="text" id="disabledTextInput"  onPaste={this.handleChange.bind(this) } onChange={ this.handleChange.bind(this) } className="form-control" placeholder="Private/Public Key" aria-describedby="button-addon4"/>)
        }
    }
    async decryptData(){
            await openpgp.initWorker({ path: 'openpgp.worker.js' }); // set the relative web worker path

        const unArmoredKeyNoSpace = this.state.key.substr(96,743).replace(/\s+/g, '\n');
        const unArmoredTextNoSpace = this.state.encryptedData.trim().substr(86);

            // put keys in backtick (``) to avoid errors caused by spaces or tabs
            //const privateKeyArmored = this.state.key.trim();

        const armoredKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.7
Comment: https://openpgpjs.org
`+'\n'+unArmoredKeyNoSpace+'\n'+'-----END PGP PUBLIC KEY BLOCK-----';

        const armoredMsg = `-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v4.10.7
Comment: https://openpgpjs.org`+'\n'+unArmoredTextNoSpace;

            const privateKeyArmored = armoredKey;

            // encrypted private key
            const passphrase = ""; // what the private key is encrypted with

            const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
            //await privateKey.decrypt(passphrase);

            const { data: decrypted } = await openpgp.decrypt({
                message: await openpgp.message.readArmored(armoredMsg),              // parse armored message
                privateKeys: [privateKey]                                           // for decryption
            });
        this.setState({decryptedData:decrypted});
        this.setState({input:"",
                            encryptedData:""});
    }
    async encryptData(){
        await openpgp.initWorker({ path: 'openpgp.worker.js' }); // set the relative web worker path


        const unArmoredKeyNoSpace = this.state.key.substr(95,641).replace(/\s+/g, '\n');

        const armoredKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.7
Comment: https://openpgpjs.org
`+unArmoredKeyNoSpace+'\n'+'-----END PGP PUBLIC KEY BLOCK-----';

        const publicKeyArmored = armoredKey;

        const passphrase = ""; // what the private key is encrypted with

        const  encrypted  = await openpgp.encrypt({
            message: openpgp.message.fromText(this.state.decryptedData.trim()),                 // input as Message object
            publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys[0] // for encryption
        });
        this.setState({encryptedData:encrypted.data});
        this.setState({input:"",
                            decryptedData:""});
    }
    handleChange(e) {
        if(e.target.id==="dataTextField"&&e.target.value!==""){
            this.setState({ input: e.target.value });
        }else if(e.target.id==="disabledTextInput"&&e.target.value!==""){
            this.setState({key:e.target.value})
        }else{
            console.log('do nothing')
        }
    }
    handleClick(e) {

        if(e.target.value==="Decrypt"){
            this.setState({encryptedData:this.state.input})
        }else if(e.target.value==="Encrypt"){
            this.setState({decryptedData:this.state.input})
        }else{
            console.log('do nothing')
        }
    }
    textAreaClick(e){
        if(e.target.value==="Encrypt"&&this.state.input!==null){
            this.handleClick(e);
            this.encryptData();
        }else if(e.target.value==="Decrypt"&&this.state.input!==null){
            this.handleClick(e);
            this.decryptData();
        }else{
            console.log('do nothing')
        }

    }
    showResults(){
        if(this.state.input===""){
            if(this.state.encryptedData===""){
                return (<div className="h6"><small>{this.state.decryptedData.split("\n").map((i,key) => {return <div key={key}>{i}</div>;})}</small></div>);
            }else if(this.state.decryptedData===""){
                return (<div className="h6"><small>{this.state.encryptedData.split("\n").map((i,key) => {return <div key={key}>{i}</div>;})}</small></div>);
            }
        }
    }

    render() {
        return (
            <div className="container">
                <label className={(this.state.disabled?"":"invisible")} htmlFor="disabledTextInput">Saved Private/Public Key!</label>
                <div className="input-group pb-5">
                {this.disabledInput()}
                <div className="input-group-append" id="button-addon4">
                    <button className="btn btn-outline-secondary" onClick={this.handleGameClik.bind(this)} type="button">Save</button>
                </div>
            </div>
                {this.showResults()}
                <div className="form-group">
                    <textarea className="form-control" onChange={ this.handleChange.bind(this) } placeholder="Message To Encode/Decode"  id="dataTextField" rows="3"></textarea>
                    <div className="p-3">
                        <input className="btn btn-outline-secondary" onClick={this.textAreaClick.bind(this)} type="submit" value="Encrypt"></input>
                        <input className="btn btn-outline-secondary" onClick={this.textAreaClick.bind(this)} type="submit" value="Decrypt"></input>
                    </div>
                    </div>
            </div>
        );
    }
}

export default Encryption;
/*

-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v4.10.7
Comment: https://openpgpjs.org

wX4D4ejbexXH7XISAgMEmzTIiwE3XmtzyYTJLmueInH2Ymvw6iwwPM85hD6h
qZpzPmkzCV9gmP/5GTtB59aITZUn8THxeSWBgqHaNHD8tTBqwatg8rZzFUgY
obyUGScR2jFXzKQqSjt8AAn7lzDzHJsWGxXMVCxMV9B4E8JPYMXSPAFIeQ+H
jHmDkCrGjGKEFEw5POlvFA0DlCPEanR04wKW7xnYzjcGl4TUFKybcQcnb+vo
NF+Ir0oSYO/qBA==
=55NA
-----END PGP MESSAGE-----




 */