import React from 'react';
import './App.css';
import Encryption from "./components/Encryption";
import EncryptCreateKeys from "./components/EncryptCreateKeys";

class App extends React.Component {
    render() {
        return (
            <div id="App">
                <div className="content container-fluid pt-5 text-center App-header">
                    <nav className="navbar fixed-top navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">MyVault</a>
                    </nav>
                    <div className="row">
                        <div className="col-3">
                            <p>Encryption</p>
                            1/3
                            <Encryption/>
                            <EncryptCreateKeys />
                        </div>
                        <div className="col-6">
                            <p>Authorize</p>
                            2/3
                        </div>
                        <div className="col-3">
                            <p>Chat</p>
                            3/3
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}

export default App;
