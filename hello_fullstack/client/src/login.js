import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Profile from './profile'; 
import Alert from './alert'; 

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeuserName = this.onChangeuserName.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.backToHome = this.backToHome.bind(this);

        this.state = {
            username: '',
            password: '',
            closePopup:false,
            className:"btn btn-primary formsubmit"
        }
    }

    onChangeuserName(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangepassword(e){
        this.setState({
            password: e.target.value
        });
    }
    togglePopup() { 
        this.setState({  
            closePopup: true  
        });
        setTimeout(() => this.setState({closePopup:false}), 2000);
    }
    backToHome(){
        ReactDOM.render(<App />, document.getElementById('root'));
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
        username: this.state.username,
        password: this.state.password
        };

        fetch("http://localhost:3001/auth", {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json',}),
            body:JSON.stringify({user})      
        })
        .then((response) => response.text())
        .then((responseText) =>JSON.parse(responseText))
        .then((data) => {
            if(data.status)
            {
                ReactDOM.render(<Profile resDetails={data}/>, document.getElementById('root'));
            }
            else
            {
                this.togglePopup();
                this.setState({
                    username: '',
                    password:''
                })
            }
})
.catch((error) => {
    console.error(error);
});
    }

    render() {
        return (
            <div className="form" style={{marginTop:40}}>
                <h3 className="title">Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input placeholder="Username" type="text" className="form-control" value={this.state.username}  onChange={this.onChangeuserName} required="required"/>
                    </div>
                    <div className="form-group">
                        <input placeholder="Password" type="password" className="form-control" value={this.state.password}  onChange={this.onChangepassword} required="required"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary homeButton">Login</button>
                        <button onClick={this.backToHome} className="btn btn-primary">Go back</button>
                    </div>
                </form>
                {this.state.closePopup ?<Alert text='Login failed ' closePopup={this.togglePopup}/>: null}
            </div>
        )
    }
}