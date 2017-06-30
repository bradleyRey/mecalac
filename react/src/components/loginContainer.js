import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import TopHeaderComponent from './topHeaderComponent'

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    console.log()
  }

  handleSubmit(e){
    e.preventDefault();
    var names = {
      'username': this.state.username,
      'password': this.state.password
    }
    axios.post(`http://localhost:3010/api/login`, names)
      .then( response => {
        if(response.data.auth){

          //browserHistory.push('/dashboard');
          localStorage.setItem('mecLoggedIn', true);
          localStorage.setItem('mecDealerId', response.data.userdata.dealerid);
          localStorage.setItem('mecDealerName', response.data.userdata.username);
          this.setState({
            isLoggedIn: true,
            userdata: response.data.userdata,
            errorMessage: false
          })
        }else {
          this.setState({
            isLoggedIn: false,
            errorMessage: 'Your login was not successful'
          })
        }
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render(){

    return(
        <div className="loginPage">
          <TopHeaderComponent />
          <img src={require('./images/loginbg.png')} className="bg" />
          <div className="loginFormWrap">
            <h3 className="orangeText">ENTER YOUR LOGIN</h3>
            <h3 className="lightgreyText">DETAILS BELOW</h3>
            <form>
              <div>
                <label>
                  <input className='fieldBox' type="text" name="username" placeholder='Select your dealer'value={this.state.username} onChange={this.handleInputChange}/>
                </label>
              </div>
              <div>
                <label>
                  <input className='fieldBox' type="password" name="password" placeholder='Password'value={this.state.password} onChange={this.handleInputChange}/>
                </label>
              </div>
                <input className="btn loginBtn" type="submit" value="Login" onClick={(e) => this.handleSubmit(e)} />
            </form>
            <div className="formResponse">
            {this.state.errorMessage ? (
              <p>{this.state.errorMessage}</p>
            ) : (
              null
            )}
            {this.state.isLoggedIn ? (
              <Redirect to={{
                pathname: '/dashboard',
                state: this.state
              }} />
            ) : (
              null
            )}
            </div>


          </div>
        </div>
    );
  };
}

export default LoginContainer;
