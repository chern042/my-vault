import React from "react";
import * as openpgp from "openpgp";
import './EncryptCreateKeys.css';


class EncryptCreateKeys extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            pubKey:"",
            privKey:"",
            name:"Jon Smith",
            email:"jon@example.com",
            password:""};
    }
    handleGameClik() {
        this.setState( {disabled: !this.state.disabled} )
    }
    async createKeyPair(){
        if(this.state.pubKey===""){

            var { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
                userIds: [{ name: this.state.name, email: this.state.email }], // you can pass multiple user IDs
                curve:'p256',
                passphrase: this.state.password           // protects the private key
            });

            this.setState({privKey:privateKeyArmored});
            this.setState({pubKey:publicKeyArmored});

            return {privKey:privateKeyArmored,pubKey:publicKeyArmored}
        }else{
            this.setState({pubKey:""});
            this.setState({privKey:""});
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
        return this.props.lang==="EN"?"Generate":"Produire";
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
        if(e.target.id==="name"&&e.target.value!==""){
            this.setState({ name: e.target.value });
        }else if(e.target.id==="email"&&e.target.value!==""){
            this.setState({email:e.target.value})
        }else if(e.target.id==="password"&&e.target.value!==""){
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
        return this.props.lang==="EN"?"Expert Options(Will not work here!)":"Options Expert (Ne fonctionnera pas ici!)";
    }
    langOptions(){
        return this.props.lang==="EN"?"Expert Options":"Options d'experts";
    }
    langFillIn(){
        return this.props.lang==="EN"?"(Fill in then generate)":"(Remplissez puis générez)";
    }
    render(){
        return (
            <div className="container my-5">
                <p>
                    <a className="btn btn-dark" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">{this.langCreate()} {this.langKey()}s</a>
                </p>
                <div className="row">
                    <div className="col">
                        <div className="collapse" id="multiCollapseExample1">
                            <div className="card card-body bg-dark">

                                <a role="button" onClick = {()=>{this.handleGameClik.bind(this);this.createKeyPair();}} data-toggle="collapse" className="btn btn-secondary btn-sm m-1" aria-expanded="false" aria-controls="keysCollapse" href="#keysCollapse">{this.langGenerate()} {this.langKey()}</a>
                                <a role="button" onClick = {this.handleGameClik.bind(this)} data-toggle="collapse" className="btn btn-secondary btn-sm m-1" aria-expanded="false" aria-controls="expertCollapse" href="#expertCollapse">{this.langOptions()} {this.langFillIn()}</a>


                                <div className="my-3 mx-3 collapse shadow text-center" id="expertCollapse" >
                                    <a>{this.langExpert()}</a>
                                    <br/>
                                    <input type="text"
                                           onPaste={this.handleChange.bind(this) }
                                           onChange={ this.handleChange.bind(this) }
                                           className="form-control w-50 m-2"
                                           placeholder={this.langName()}
                                            id="name"/>
                                    <input type="text"
                                           onPaste={this.handleChange.bind(this) }
                                           onChange={ this.handleChange.bind(this) }
                                           className="form-control w-50 m-2"
                                           placeholder="E-mail"
                                           id="email"/>
                                    <input type="text"
                                           onPaste={this.handleChange.bind(this) }
                                           onChange={ this.handleChange.bind(this) }
                                           className="form-control w-50 m-2"
                                           placeholder={this.langPassword()}
                                           id="password"/>
                                </div>


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