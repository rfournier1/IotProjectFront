import React from 'react';
import M from "materialize-css";
import logo from '../logo.svg';
import conf from '../conf.json';

class MainComponent extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state= {
            amount : 0,
            uuid: conf.uuid,
            address:"",
            bufferUuid:"",
            password: conf.password,
            bufferPassword:""
        };
        this.Tooltip=[];
        this.handleChange = this.handleChange.bind(this);
        this.saveUuid = this.saveUuid.bind(this);
        
    }
    componentDidMount(){
        const options = {
            onOpenEnd: () => {
                this.setState({"bufferPassword": ""});
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
        M.Modal.init(this.PasswdModal, options);
        this.Tooltip.forEach(element => {
            M.Tooltip.init(element, {});
        });
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    saveUuid(){
        if(this.state.bufferPassword===this.state.password){
            this.setState({"uuid": this.state.bufferUuid});
            this.setState({"bufferUuid": ""});
            this.setState({"bufferPassword": ""});
            const fs = require('fs');
            fs.readFile('../conf.json', 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
            /*var result = data.replace(/string to be replaced/g, 'replacement');

            fs.writeFile('../conf.json', result, 'utf8', function (err) {
                if (err) return console.log(err);
            });*/
                console.log(data)
            });
        }else{
            this.setState({"bufferPassword": ""});
        }
    }

    
    
    
    render() {
        
        
        return (
            <div>
                <div className="App-header">
                    <div className="navbar-fixed">
                        <nav>
                            <div className="nav-wrapper teal"   >
                            <img src={logo} className="App-logo" alt="IOTA"></img>
                            <ul className="right">
                                <li><a className="modal-trigger" ref={Tooltip => {this.Tooltip.push(Tooltip);}}
                                data-target="modal1" data-tooltip="Settings" data-position="left" href="#!">
                                    <i className="material-icons">settings</i>
                                </a></li>
                            </ul>
                            </div>
                        </nav>
                        <div ref={Modal => {this.Modal = Modal;}} id="modal1" className="modal">
                            <div className="modal-content">
                                <h4>Terminal Settings</h4>
                                <br/>
                                <div class="input-field">                                
                                    <input type="text" id="bufferUuid" name="bufferUuid" value={this.state.bufferUuid} onChange={this.handleChange}></input> 
                                    <label for="bufferUuid">Reciever public key</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="modal-close modal-trigger waves-effect waves-green btn-flat" data-target="modal2">Confirm</button>
                            </div>
                        </div>

                        <div ref={PasswdModal => {this.PasswdModal = PasswdModal;}} id="modal2" className="modal">
                            <div className="modal-content">
                                <h4>Type your password to confirm</h4>
                                <span>The actual reciever public key :</span>
                                <blockquote>{this.state.uuid}</blockquote>
                                <span>will be replaced by:</span>
                                <blockquote>{this.state.bufferUuid}</blockquote>
                                <br/>
                                <div class="input-field">
                                    <input id="bufferPassword" type="password" name="bufferPassword" value={this.state.bufferPassword} onChange={this.handleChange}></input>
                                    <label for="bufferPassword">Admin password</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="modal-close waves-effect waves-green btn-flat" onClick={this.saveUuid}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="MainForm">
                    <div className="card teal lighten-5">
                        <div className="card-content">
                            <form className="transaction-form">
                                <label>Reciever public key</label>                              
                                <input disabled type="text" value={this.state.uuid}></input> 
                                    

                                <input name="amount" value={this.state.amount} onChange={this.handleChange}></input>
                                <input name="address" value={this.state.address} onChange={this.handleChange}></input>
                                
                                <button className="waves-effect waves-light btn " ref={Tooltip2 => {this.Tooltip.push(Tooltip2);}}
                                data-position="right"  data-tooltip="Click to confirm transaction" type="submit" name="action">
                                    send <i className="material-icons right">import_export</i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
};  

export default MainComponent;