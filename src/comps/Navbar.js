import React from 'react';
import logo from '../logo.svg';
import M from "materialize-css";



class NavbarComponent extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state= {
            address:""
        };
        this.Tooltip=[];
       
        this.handleChange = this.handleChange.bind(this);
        
    
        
          
    }
    componentDidMount(){
        const options = {
            onOpenStart: () => {
              console.log("Open Start");
            },
            onOpenEnd: () => {
              console.log("Open End");
            },
            onCloseStart: () => {
              console.log("Close Start");
            },
            onCloseEnd: () => {
              console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
        this.Tooltip.forEach(element => {
            M.Tooltip.init(element, {});
        });
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    

    render() {
        
        
        return (

            <div className="navbar-fixed">
               <nav>
                    <div className="nav-wrapper teal"   >
                    <img src={logo} class="App-logo" alt="IOTA"></img>
                    <ul class="right">
                        <li><a class="modal-trigger" ref={Tooltip => {this.Tooltip.push(Tooltip);}}
                        data-target="modal1" data-tooltip="Settings" data-position="left">
                            <i class="material-icons">settings</i>
                        </a></li>
                    </ul>
                    </div>
                </nav>
                <div ref={Modal => {
            this.Modal = Modal;
          }} id="modal1" class="modal">
                    <div class="modal-content">
                        <h4>Modal Header</h4>
                        <p>Yoyoyo</p>
                        </div>
                        <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>
        )
    }

    
};

export default NavbarComponent;