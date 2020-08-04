import React from "react";
import * as openpgp from "openpgp";
import './EncryptCreateKeys.css';
const $ = window.$;


class EncryptCreateKeys extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            pubKey:"",
            privKey:"",
            name:"Jon Smith",
            email:"jon@example.com",
            password:""};

    }
    handleGameClik(e) {
        var expertOpen = $('#expertBtn').attr('aria-expanded')
        this.setState( {disabled: !this.state.disabled} )
        if(expertOpen==="false"){
            this.setState( {
                name: "Jon Smith",
                email: "jon@example.com",
                password:""})

        }
        this.createKeyPair();

    }
    async createKeyPair(){
        console.log('making with: ', this.state.name, this.state.email)
        try{
            if(!this.state.disabled){

                var { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
                    userIds: [{ name: this.state.name, email: this.state.email }], // you can pass multiple user IDs
                    curve:'p256',
                    passphrase: this.state.password           // protects the private key
                });

                this.setState({privKey:privateKeyArmored});
                this.setState({pubKey:publicKeyArmored});

                return {privKey:privateKeyArmored,pubKey:publicKeyArmored}
            }else{
                console.log('do nothing')
                this.setState({pubKey:""});
                this.setState({privKey:""});
            }
        }catch (e) {
            this.props.onChange('Email');
            $('.modal').modal('show');
            console.log(e)
        }

    }
    langKey(){
        return this.props.lang==="EN"?"Key":"Clé";
    }
    langPublicKey(){
        return this.props.lang==="EN"?"Public Key":"Clé Publique";
    }
    langPrivateKey(){
        return this.props.lang==="EN"?"Private Key":"Clé Privée";
    }
    langGenerate(){
        return this.props.lang==="EN"?"Generate":"Générer";
    }
    langCreate(){
        return this.props.lang==="EN"?"Create":"Créer";
    }
    langCanShare(){
        return this.props.lang==="EN"?"Can Share":"Peut Partager";
    }
    langKeepSafe(){
        return this.props.lang==="EN"?"Keep Safe":"Gardez en Sécurité";
    }
    langLoading(){
        return this.props.lang==="EN"?"Loading":"Chargement";
    }
    handleChange(e) {
        console.log(e.target.value)
        if(e.target.id==="name"){
            if(e.target.value===""){
                this.setState({ name: "Jon Smith" });
            }else{
                this.setState({ name: e.target.value });
            }
        }else if(e.target.id==="email"){
            if(e.target.value===""){
                this.setState({email: "jon@example.com"})
            }else{
                this.setState({email:e.target.value})
            }
        }else if(e.target.id==="password"){
            this.setState({password:e.target.value})
        }else{
            console.log('do nothing')
        }
    }
    langPassword(){
        return this.props.lang==="EN"?"Password":"Mot de passe";
    }
    langName(){
        return this.props.lang==="EN"?"Name":"Nom";
    }
    langExpert(){
        return this.props.lang==="EN"?"Expert Options":"Options Expert";
    }
    langWorkHere(){
        return this.props.lang==="EN"?"Will not work here!":"Ne fonctionnera pas ici!";
    }
    langOptions(){
        return this.props.lang==="EN"?"Expert Options":"Options d'experts";
    }
    langFillIn(){
        return this.props.lang==="EN"?"Fill in, then click \"Generate\".":"Remplissez, puis cliquez sur \"Générer\".";
    }
    langExpertHelp(){
        return this.props.lang==="EN"?"To generate keys with a password, please note that you will not be able to decode messages encoded with password-associated private keys. You are able to encrypt with a password-associated public key, but can not decrypt with the corresponding private key.":"Pour générer des clés avec un mot de passe, veuillez noter que vous ne pourrez pas décoder les messages encodés avec des clés privées associées à un mot de passe. Vous pouvez chiffrer avec une clé publique associée à un mot de passe, mais ne pouvez pas déchiffrer avec la clé privée correspondante.";
    }
    clearExpert(){
        var expertOpen = $('#expertBtn').attr('aria-expanded')
        if(expertOpen==="false"){
            $('#name').val("");
            $('#email').val("");
            $('#password').val("");
            this.setState({
                name: "Jon Smith",
                email: "jon@example.com",
                password: ""
            });

        }

    }
    render(){
        return (
            <div className="container my-5">

                <p>
                    <a className="btn btn-dark"  data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">{this.langCreate()} {this.langKey()}s</a>
                </p>
                <div className="row">
                    <div className="col">
                        <div className="collapse" id="multiCollapseExample1">
                            <div className="card card-body bg-dark">

                                <a role="button" id="expertBtn" onClick={this.clearExpert.bind(this)} data-toggle="collapse" className="btn btn-secondary btn-sm m-1" aria-expanded="false" aria-controls="expertCollapse" href="#expertCollapse">{this.langOptions()}</a>


                                <div className="my-3 mx-3 collapse shadow text-center" id="expertCollapse" >
                                    <a>{this.langFillIn()}</a>
                                    <br/>
                                    <div className="row">
                                        <div className="col mb-5">
                                            <div id="nameDiv" className="d-flex justify-content-center">
                                                <input type="text"
                                                       onPaste={this.handleChange.bind(this) }
                                                       onChange={ this.handleChange.bind(this) }
                                                       className="form-control m-2"
                                                       placeholder={this.langName()}
                                                        id="name"/>
                                            </div>
                                            <div id="emailDiv" className="d-flex justify-content-center">
                                                <input type="email"
                                                       onPaste={this.handleChange.bind(this) }
                                                       onChange={ this.handleChange.bind(this) }
                                                       className="form-control m-2"
                                                       placeholder="E-mail"
                                                       id="email"
                                                        onInvalid={()=>{$('.modal').modal('show')}}/>
                                            </div>
                                            <div id="passwordDiv" className="d-flex justify-content-center">
                                                <input type="text"
                                                   onPaste={this.handleChange.bind(this) }
                                                   onChange={ this.handleChange.bind(this) }
                                                   className="form-control m-2"
                                                   placeholder={this.langPassword()}
                                                   id="password"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h3 className="text-danger font-weight-bold">{this.langWorkHere()}!</h3>
                                            <h5 className="text-left">{this.langExpertHelp()}</h5>
                                        </div>
                                    </div>
                                </div>
                                <a role="button" id="genBtn" onClick = {this.handleGameClik.bind(this)} data-toggle="collapse" className="btn btn-secondary btn-sm m-1" aria-expanded="false" aria-controls="keysCollapse" href="#keysCollapse">{this.langGenerate()}</a>


                                <a className={(this.state.privKey===""?"invisible":"")} >{this.langPrivateKey()} ({this.langKeepSafe()}!):</a>
                                <div className="my-3 mx-3 collapse shadow" id="keysCollapse" >

                                    <div className={(this.state.privKey==null?"":"d-none")} >
                                        <div className="spinner-border m-5" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>

                                    <div className="h6"><small>{this.state.privKey.split("\n").map((i,key) => {return <div key={key}>{i}</div>;})}</small></div>
                                </div>

                                <a className={(this.state.privKey===""?"invisible":"")} >{this.langPublicKey()} ({this.langCanShare()}!):</a>
                                <div className="my-3 mx-3 collapse shadow" id="keysCollapse">

                                    <div className={(this.state.privKey==null?"":"d-none")} >
                                        <div className="spinner-border m-5" role="status">
                                            <span className="sr-only">{this.langLoading()}...</span>
                                        </div>
                                    </div>


                                    <div className="h6"><small>{this.state.pubKey.split("\n").map((i,key) => {return <div key={key}>{i}</div>;})}</small></div>
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