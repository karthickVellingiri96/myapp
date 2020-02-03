import React, { Component } from 'react';
import Popup from './popup'; 
import Alert from './alert';
import ReactDOM from 'react-dom';
import Profile from './profile'; 
import App from './App';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeComfirmPassword = this.onChangeComfirmPassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeMobileNo = this.onChangeMobileNo.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.backToHome = this.backToHome.bind(this);


        this.state = {
            username: '',
            password: '',
            comfirmPassword:'',
            address:'',
            mobileNo:'',
            showPopup: false,
            closePopup:false,
            className:"btn btn-primary formsubmit",
            mail:'',
            age:''
        }
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
        
    }
    onChangeComfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value
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

    onSubmit(e) {  

        e.preventDefault();
        if(this.state.password===this.state.confirmPassword)
        {

            const user = {
                username: this.state.username,
                password: this.state.password,
                address:this.state.address,
                mobileNo:this.state.mobileNo,
                mail:this.state.mail,
                age:this.state.age
                };

            fetch("http://localhost:3001/add", {
    method: 'POST',
    headers: new Headers({
               'Content-Type': 'application/json', 
      }),
    body:JSON.stringify({
        user})
      })
          .then((response) => response.text())
          .then((responseText) =>JSON.parse(responseText))
          .then((data) => {
              if(!data.status)
              {
                this.toggleAlert();
                this.setState({
                    confirmPassword:''
                })
              }
              else
              {
                ReactDOM.render(<Profile resDetails={data}/>, document.getElementById('root'));
              }
          
          })
          .catch((error) => {
          console.error(error);
      }); 
  
      this.setState({
          username: '',
          password: '',
          address:'',
          mobileNo:'',
          showPopup: false,
          className:"btn btn-primary formsubmit",
          mail:'',
          age:''
          })
        }
        else
        {
            //alert('password not same...');
            this.togglePopup();
            this.setState({
                confirmPassword: ''
            })
        }   
        
    }
    togglePopup() { 
        this.setState({  
             showPopup: !this.state.showPopup  
        });
        if(!this.state.showPopup) 
        {
            this.setState({className:"btn btn-primary formsubmit disabled"});
        } 
        else
        {
            this.setState({className:"btn btn-primary formsubmit"}) ;
        }
         }
    toggleAlert() { 
        this.setState({  
        closePopup: true 
        });
    }
    backToHome(){
        ReactDOM.render(<App />, document.getElementById('root'));
    }

    render() {
        return (
            <div className="form" style={{marginTop:40}}>
                <h3 className="title">Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input placeholder="Username" type="text" className="form-control" value={this.state.username}  onChange={this.onChangeUserName} required="required" />
                    </div>
                    <div className="form-group">
                        <input  placeholder="Password" type="password" className="form-control" value={this.state.password}  onChange={this.onChangePassword} required="required" maxLength="6"pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"/>
                    </div>
                    <div className="form-group">
                        <input placeholder="Confirm password" type="password" className="form-control" value={this.state.confirmPassword}  onChange={this.onChangeComfirmPassword} required="required"/>
                    </div>
                    <div className="form-group">
                        <input placeholder="Address" type="text" className="form-control" value={this.state.address}  onChange={this.onChangeAddress} required="required"/>
                    </div>
                    <div className="form-group">
                        <input placeholder="Mobile number" type="number" className="form-control" value={this.state.mobileNo}  onChange={this.onChangeMobileNo} required="required"/>
                    </div>
                    <div className="form-group">
                        <input placeholder="E-mail" type="email" className="form-control" value={this.state.mail}  onChange={this.onChangeMail} required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                    </div>
                    <div className="form-group">
                        <input placeholder="Age" type="number" className="form-control" value={this.state.age}  onChange={this.onChangeAge}required="required" />
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary homeButton">Register</button>
                        <button onClick={this.backToHome} className="btn btn-primary">Go back</button>
                    </div>
                </form>
                <div>
                {this.state.closePopup ?  
                <Alert  
                          text='Name already exist'  
                          closePopup={this.toggleAlert}  
                />  
                : null  
                }
            {this.state.showPopup ?  
                <Popup  
                          text='Passwords did not match'  
                          closePopup={this.togglePopup}  
                />  
                : null  
                }
            </div> 
            </div>
             
        )
    }
}