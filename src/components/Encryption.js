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
            privKey:null,
            pubKey:null,
            errorType:""};
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
                               id="disabledTextInputPub"
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
                               id="disabledTextInputPub"
                               onPaste={this.handleChange.bind(this) }
                               onChange={ this.handleChange.bind(this) }
                               className="form-control"
                               placeholder={this.langPublicKey()}
                               aria-describedby="button-addon4"/>
                        <div className="input-group-append" id="button-addon4">
                            <button className="btn btn-outline-secondary" onClick={this.handlePubClick.bind(this)} >{this.langSave()}</button>
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
                           id="disabledTextInputPriv"
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
                           id="disabledTextInputPriv"
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

            const unArmoredKeyNoSpace = this.state.privKey.substr(96, 743).replace(/\s+/g, '\n');

            const unArmoredTextNoSpace = this.state.encryptedData.trim().substr(86)!=""?this.state.encryptedData.trim().substr(86):this.state.input.trim().substr(86);

            // put keys in backtick (``) to avoid errors caused by spaces or tabs
            //const privateKeyArmored = this.state.key.trim();

            const armoredKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP.js v4.10.7\nComment: https://openpgpjs.org\n` + unArmoredKeyNoSpace + '\n' + '-----END PGP PUBLIC KEY BLOCK-----';

            const armoredMsg = `-----BEGIN PGP MESSAGE-----\nVersion: OpenPGP.js v4.10.7\nComment: https://openpgpjs.org` + '\n' + unArmoredTextNoSpace+`\n-----END PGP MESSAGE----- `;

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
            this.props.onChange("Decrypt")
            $('.modal').modal('show');
            console.log(e.toString())
        }
    }
    async encryptData(){
        try {


            await openpgp.initWorker({path: 'openpgp.worker.js'}); // set the relative web worker path


            const unArmoredKeyNoSpace = this.state.pubKey.substr(95, 641).replace(/\s+/g, '\n');
            console.log('ug',unArmoredKeyNoSpace)

            const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP.js v4.10.7\nComment: https://openpgpjs.org\n` + unArmoredKeyNoSpace + '\n' + '-----END PGP PUBLIC KEY BLOCK-----';
            console.log('ug',publicKeyArmored)

            const passphrase = ""; // what the private key is encrypted with
            var test = await openpgp.key.readArmored(publicKeyArmored)

            const encrypted = await openpgp.encrypt({
                message: openpgp.message.fromText(this.state.decryptedData.trim()!=""?this.state.decryptedData.trim():this.state.input.trim()),                 // input as Message object
                publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys[0] // for encryption
            });
            this.setState({encryptedData: encrypted.data});
            this.setState({
                input: "",
                decryptedData: ""
            });
        }catch(e){
            this.props.onChange("Encrypt")
            $('.modal').modal('show');
            console.log(e.toString())
        }
    }
    handleChange(e) {
        if(e.target.id==="dataTextField"&&e.target.value!==""){
            this.setState({ input: e.target.value });
        }else if(e.target.id==="disabledTextInputPriv"&&e.target.value!==""){
            this.setState({privKey:e.target.value})
        }else if(e.target.id==="disabledTextInputPub"&&e.target.value!==""){
            this.setState({pubKey:e.target.value})
        }else{
            console.log('do nothing')
        }
    }
    textAreaClick(e){
        console.log(e)
        console.log(e.target)
        console.log('input:',this.state.input,"key:",this.state.key)
        //this.props.errorType = 'test' +
        this.props.onChange('My New name');
        console.log('efed',this.props)

        if(e.target.value==="Encrypt"&&this.state.input!==null){
            this.setState({decryptedData:this.state.input})
            //this.handleClick(e);
            this.encryptData();
        }else if(e.target.value==="Decrypt"&&this.state.input!==null){
            this.setState({encryptedData:this.state.input})
            //this.handleClick(e);
            this.decryptData();
        }else{
            this.props.onChange("Empty")
            $('.modal').modal('show');

        }

    }
    showResults(){
        if(this.state.input===""){
            if(this.state.encryptedData===""){
                return (<div className="h6 text-success"><small>{this.state.decryptedData.split("\n").map((i,key) => {return <div key={key}>{i}</div>;})}</small></div>);
            }else if(this.state.decryptedData===""){
                return (<div className="h6 text-success"><small>{this.state.encryptedData.split("\n").map((i,key) => {return <div key={key}>{i}</div>;})}</small></div>);
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
    errorModalEn() {
        if(this.props.errorType==="Encrypt"){
            return "Sorry, something is wrong with your public key!";
        }else if(this.props.errorType==="Decrypt"){
            return "Sorry, something is wrong with your private key or message!"
        }else if(this.props.errorType==="Email"){
            return "Sorry, your E-mail is incorrect!"
        }else if(this.props.errorType==="Empty"){
            return "Sorry, it appears like one or more of your fields are empty!"
        }else{
            return "Sorry, there is some error going on!"
        }
    }
    errorModalFr(){
        if(this.props.errorType==="Encrypt"){
            return "Désolé, il y a un problème avec votre clé publique!";
        }else if(this.props.errorType==="Decrypt"){
            return "Désolé, il y a un problème avec votre clé privée ou votre message!"
        }else if(this.props.errorType==="Email"){
            return "Désolé, votre E-mail est incorrect!!"
        }else if(this.props.errorType==="Empty"){
            return "Désolé, il semble qu'un ou plusieurs de vos champs soient vides!"
        }else{
            return "Désolé, une erreur est en cours!"
        }
    }
    errorModalChoose(){
        if(this.props.lang==="EN"){
            return this.errorModalEn()
        }else{
            return this.errorModalFr()
        }
    }
    langOops(){
        return this.props.lang==="EN"?"Oops! Looks like something went wrong...":"Oups! Il semble que quelque chose s'est mal passé...";
    }
    langClose(){
        return this.props.lang==="EN"?"Close":"Ferme";
    }
    render() {

        return (
            <div className="container">

                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false"
                     tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger font-weight-bold" id="staticBackdropLabel">{this.langOops()}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label={this.langClose()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-dark">
                                <h4>{this.errorModalChoose()}</h4>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                {this.disabledPubInput()}
                {this.disabledPrivInput()}

                {this.showResults()}
                <div className="form-group">
                    <textarea className="form-control" onChange={ this.handleChange.bind(this) } placeholder={this.langMesssageTo()}  id="dataTextField" rows="3"></textarea>
                    <div className="m-3">
                        <input className="btn btn-outline-secondary mx-2"   onClick={this.textAreaClick.bind(this)} type="submit" value={this.langEncrypt()}></input>
                        <input className="btn btn-outline-secondary mx-2" onClick={this.textAreaClick.bind(this)} type="submit" value={this.langDecrypt()}></input>
                    </div>
                    </div>

            </div>
        );
    }
}

export default Encryption;
