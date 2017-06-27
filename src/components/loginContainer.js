import React, { Component } from 'react';
import axios from 'axios';
import * as data from '../api/leads.json';
import { browserHistory } from 'react-router';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';




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
    axios.post(`http://localhost:3010/api`, names)
      .then( response => {
        if(response.data.auth){

          //browserHistory.push('/dashboard');

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
        <div>
          <form >
            <label>
              Username:
              <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange}/>
            </label>
            <label>
              Password:
              <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
            </label>
              <input type="submit" value="Submit" onClick={(e) => this.handleSubmit(e)} />
          </form>
          <div>
            {this.state.errorMessage ? (
              <p>{this.state.errorMessage}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
    );
  };
}

export default LoginContainer;
