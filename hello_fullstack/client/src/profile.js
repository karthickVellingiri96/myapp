import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Alert from './alert';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.update = this.update.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeMobileNo = this.onChangeMobileNo.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);

        this.state = {
            username: props.resDetails.data.name,
            address: props.resDetails.data.address,
            mobileNo:props.resDetails.data.mobileNo,
            mail:props.resDetails.data.mail,
            age:props.resDetails.data.age,
            closePopup:false,
        }
    }
    toggleAlert() { 
        this.setState({  
        closePopup: true 
        });
        setTimeout(() => this.setState({closePopup:false}), 2000);
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }

    onChangeMobileNo(e){
        this.setState({
            mobileNo: e.target.value
        });
    }
    onChangeMail(e){
        this.setState({
            mail: e.target.value
        });
    }
    onChangeAge(e){
        this.setState({
            age: e.target.value
        });
    }

    update(){

        const user = {
            username: this.state.username,
            address:this.state.address,
            mobileNo:this.state.mobileNo,
            mail:this.state.mail,
            age:this.state.age
            };
        fetch("http://localhost:3001/update", {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json',}),
        body:JSON.stringify({user})
        })
          .then((response) => response.text())
          .then((responseText) =>JSON.parse(responseText))
          .then((data) => {this.toggleAlert(); ReactDOM.render(<Profile resDetails={data}/>, document.getElementById('root'));})
          .catch((error) => {console.error(error);}); 
    }

    onLogout(e) {
        e.preventDefault();
        ReactDOM.render(<App />, document.getElementById('root'));
      }

    render() {
        return (
            <div className="profilepage" style={{marginTop:40}}>
                <h4 align="left" className="title">Welcome, {this.state.username}</h4>
                <div className="form-group">
                <table align="center" className="profilefont">
                    <tbody >
                        <tr>
                            <td align="left">Address </td>
                            <td align="left"><input type="text" className="form-control form-control" style={{marginBottom:0}}  value={this.state.address} onChange={this.onChangeAddress} required="required"/></td>
                        </tr>
                        <tr>
                            <td align="left">Mobile </td>
                            <td align="left"><input type="number" className="form-control form-control" style={{marginBottom:0}} value={this.state.mobileNo} onChange={this.onChangeMobileNo} required="required"></input> </td>
                        </tr>
                        <tr>
                            <td align="left">Email </td>
                            <td align="left"><input type="email" className="form-control form-control" style={{marginBottom:0}} value={this.state.mail}  onChange={this.onChangeMail} required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"></input></td>
                        </tr>
                        <tr>
                            <td align="left">Age </td>
                            <td align="left"><input type="number" className="form-control form-control" style={{marginBottom:0}} value={this.state.age} onChange={this.onChangeAge} required="required"></input></td>
                        </tr>
                        </tbody></table>
                        </div>
                        <div className="form-group" style={{marginTop:20}}>
                        <button onClick={this.update} className="btn btn-primary homeButton">Update</button>
                        <button onClick={this.onLogout} className="btn btn-primary">Logout</button>
                        {this.state.closePopup ?  
                <Alert  
                          text='Successfully updated'  
                          closePopup={this.toggleAlert}  
                />  
                : null  
                }
                    </div>
            </div>
        )
    }
}