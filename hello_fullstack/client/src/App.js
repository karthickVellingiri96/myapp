
import React, { Component } from 'react'; 
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Login from './login';
import Register from './register';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.navigateLogin = this.navigateLogin.bind(this);
    this.navigateRegister = this.navigateRegister.bind(this);
  }

  navigateLogin() {
    ReactDOM.render(<Login />, document.getElementById('root'));
  }
  navigateRegister() {
    ReactDOM.render(<Register />, document.getElementById('root'));
  }
  render() {
    return (
      <Router>
        <div className="login-page">
        <div className="form" style={{marginTop:40}}>   
          <h2 className="appName">MyApp.com</h2>
          <div className="form-group">
            <button onClick={this.navigateLogin} className="btn btn-primary homeButton">Login</button>
            <button onClick={this.navigateRegister} className="btn btn-primary">Register</button>
          </div>
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
