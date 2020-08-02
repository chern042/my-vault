import React from "react";
import './Encryption.css';
const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
const $ = window.$;

class Encryption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pubDisabled:false,
            privDisabled: false,
            encryptedData:null,
            decryptedData:null,
            input:null,
            key:null};
    }
    handlePubClick() {
        this.setState( {pubDisabled: !this.state.pubDisabled})
    }
    handlePrivClick() {
        this.setState( {privDisabled: !this.state.privDisabled} )
    }
    disabledPubInput(){
        if(this.state.pubDisabled){
            return (
                    <div className="input-group mb-3">
                        <input type="text"
                               onPaste={this.handleChange.bind(this) }
                               onChange={ this.handleChange.bind(this) }
                               className="form-control"
                               placeholder={this.langPublicKey()}
                               aria-describedby="button-addon4" disabled/>
                        <div className="input-group-append" id="button-addon4">
                            <button className="btn btn-outline-secondary"  onClick={this.handlePubClick.bind(this)}>{this.langSave()}</button>
                        </div>
                    </div>
             )
        }else{
            return (
                    <div className="input-group mb-3">
                        <input type="text"
                               onPaste={this.handleChange.bind(this) }
                               onChange={ this.handleChange.bind(this) }
                               className="form-control"
                               placeholder={this.langPublicKey()}
                               aria-describedby="button-addon4"/>
                        <div className="input-group-append" id="button-addon4">
                            <button className="btn btn-outline-secondary"  onClick={this.handlePubClick.bind(this)} type="button">{this.langSave()}</button>
                        </div>
                    </div>
            )
        }
    }
    disabledPrivInput(){
        if(this.state.privDisabled){
            return(
                <div className="input-group mb-5">

                    <input type="text"
                           id="disabledTextInput"
                           onPaste={this.handleChange.bind(this) }
                           onChange={this.handleChange.bind(this) }
                           className="form-control"
                           placeholder={this.langPrivateKey()}
                           aria-describedby="button-addon5" disabled/>
                    <div className="input-group-append" id="button-addon5">
                        <button className="btn btn-outline-secondary"  onClick={this.handlePrivClick.bind(this)} type="button">{this.langSave()}</button>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="input-group mb-5">
                    <input type="text"
                           id="disabledTextInput"
                           onPaste={this.handleChange.bind(this) }
                           onChange={this.handleChange.bind(this) }
                           className="form-control"
                           placeholder={this.langPrivateKey()}
                           aria-describedby="button-addon5"/>
                    <div className="input-group-append" id="button-addon5">
                        <button className="btn btn-outline-secondary"  onClick={this.handlePrivClick.bind(this)} type="button">{this.langSave()}</button>
                    </div>
                </div>
            )

        }
    }
    async decryptData(){
        try {
            await openpgp.initWorker({path: 'openpgp.worker.js'}); // set the relative web worker path

            const unArmoredKeyNoSpace = this.state.key.substr(96, 743).replace(/\s+/g, '\n');
            const unArmoredTextNoSpace = this.state.encryptedData.trim().substr(86);

            // put keys in backtick (``) to avoid errors caused by spaces or tabs
            //const privateKeyArmored = this.state.key.trim();

            const armoredKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
    Version: OpenPGP.js v4.10.7
    Comment: https://openpgpjs.org
    ` + '\n' + unArmoredKeyNoSpace + '\n' + '-----END PGP PUBLIC KEY BLOCK-----';

            const armoredMsg = `-----BEGIN PGP MESSAGE-----
    Version: OpenPGP.js v4.10.7
    Comment: https://openpgpjs.org` + '\n' + unArmoredTextNoSpace;

            const privateKeyArmored = armoredKey;

            // encrypted private key
            const passphrase = ""; // what the private key is encrypted with

            const {keys: [privateKey]} = await openpgp.key.readArmored(privateKeyArmored);
            //await privateKey.decrypt(passphrase);

            const {data: decrypted} = await openpgp.decrypt({
                message: await openpgp.message.readArmored(armoredMsg),              // parse armored message
                privateKeys: [privateKey]                                           // for decryption
            });
            this.setState({decryptedData: decrypted});
            this.setState({
                input: "",
                encryptedData: ""
            });
        }catch(e){
            console.log(e)
        }
    }
    async encryptData(){
        try {


            await openpgp.initWorker({path: 'openpgp.worker.js'}); // set the relative web worker path


            const unArmoredKeyNoSpace = this.state.key.substr(95, 641).replace(/\s+/g, '\n');

            const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
    Version: OpenPGP.js v4.10.7
    Comment: https://openpgpjs.org
    ` + unArmoredKeyNoSpace + '\n' + '-----END PGP PUBLIC KEY BLOCK-----';

            const passphrase = ""; // what the private key is encrypted with

            const encrypted = await openpgp.encrypt({
                message: openpgp.message.fromText(this.state.decryptedData.trim()),                 // input as Message object
                publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys[0] // for encryption
            });
            this.setState({encryptedData: encrypted.data});
            this.setState({
                input: "",
                decryptedData: ""
            });
        }catch(e){

            $('.modal').show();
            console.log(e.toString())
        }
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
        if(e.target.value==="Encrypt"&&this.state.input!==null&&this.state.key!==null){
            this.handleClick(e);
            this.encryptData();
        }else if(e.target.value==="Decrypt"&&this.state.input!==null&&this.state.key!==null){
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
    langPublicKey(){
        return this.props.lang==="EN"?"Public Key":"Clé Publique";
    }
    langPrivateKey(){
        return this.props.lang==="EN"?"Private Key":"Clé Privée";
    }

    langSave(){
        return this.props.lang==="EN"?"Save":"Sauver";
    }
    langEncrypt(){
        return this.props.lang==="EN"?"Encrypt":"Crypter";
    }
    langDecrypt(){
        return this.props.lang==="EN"?"Decrypt":"Décrypter";
    }
    langMesssageTo(){
        return this.props.lang==="EN"?"Message To Encode/Decode":"Message à Encoder/Décoder";
    }
    render() {

        return (
            <div className="container">

                {this.disabledPubInput()}
                {this.disabledPrivInput()}

                {this.showResults()}
                <div className="form-group">
                    <textarea className="form-control" onChange={ this.handleChange.bind(this) } placeholder={this.langMesssageTo()}  id="dataTextField" rows="3"></textarea>
                    <div className="m-3">
                        <input className="btn btn-outline-secondary mx-2" onClick={this.textAreaClick.bind(this)} type="submit" value={this.langEncrypt()}></input>
                        <input className="btn btn-outline-secondary mx-2" onClick={this.textAreaClick.bind(this)} type="submit" value={this.langDecrypt()}></input>
                    </div>
                    </div>

            </div>
        );
    }
}

export default Encryption;
