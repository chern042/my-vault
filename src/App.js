import React from 'react';
import './App.css';
import Encryption from "./components/Encryption";
import EncryptCreateKeys from "./components/EncryptCreateKeys";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: "EN",
            errorType:"None"
        };
    }
    handleLangSwitch(e){
        this.setState({lang:this.state.lang==="EN"?"FR":"EN"})
    }
    langTitle(){
        return this.state.lang==="EN"?"MyVault":"VoûteMoi";
    }
    onChange(newName) {
        console.log('waa')
        this.setState({ errorType: newName });
    }
    render() {
        const lang = this.state.lang;
        var errorType = this.state.errorType;
        return (
            <div id="App">
                <div className="content container-fluid pt-5 text-center App-header">
                    <nav className="navbar fixed-top navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">{this.langTitle()}</a>
                        <button className="btn btn-secondary"  onClick={this.handleLangSwitch.bind(this)}>{this.state.lang==="EN"?"EN":"FR"}</button>
                    </nav>
                    <div className="row">
                        <div className="col">
                            <h1>{this.langTitle()} PGP</h1>
                            <Encryption lang={lang} errorType={errorType} onChange={this.onChange.bind(this)}/>
                            <EncryptCreateKeys lang={lang} errorType={errorType} onChange={this.onChange.bind(this)}/>
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}

export default App;
