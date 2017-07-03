import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import TopHeaderComponent from './topHeaderComponent'
import LeadsApi from '../api/leads'

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.assignChosenDealer = this.assignChosenDealer.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state)
    var names = {
      'username': this.state.chosenDealer,
      'password': this.state.password
    }
    axios.post(`http://localhost:3010/api/login`, names)
      .then( response => {
        if(response.data.auth){
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
  assignChosenDealer(dealer){

    this.setState({
      chosenDealer: dealer
    });
  }

  render(){
    return(
        <div className="loginPage">
          <TopHeaderComponent />
          <img src={require('./images/loginbg.png')} className="bg" />
          <div className="loginFormWrap">
          <div>
            <img  className='HeaderArrowSmallLogin' src={require('./images/Arrow.png')}/>
          </div>
            <h3 className="orangeText">ENTER YOUR LOGIN</h3>
            <h3 className="lightgreyText">DETAILS BELOW</h3>
            <form id="selectInputs">
              <div>
                <DropdownComponent chosenDealer={this.assignChosenDealer}/>
              </div>
              <div>
                <label className='userField'>
                  <input className='loginInput' type="password" name="password" placeholder='Password'value={this.state.password} onChange={this.handleInputChange}/>
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


class DropdownComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenValue: '',
      dealers: []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
    LeadsApi.viewDealers( names => {
      this.setState({
        dealers: names.data
      })
    })
  }
  handleChange(e){
    //pass values up to parent
    this.props.chosenDealer(e.target.value)
    this.setState({chosenValue: e.target.value});

  }
  render(){
    return(
      <div>
        <select className='loginInput' id='dealers' value={this.state.chosenValue} onChange={this.handleChange}>
          <option>Please select your dealer</option>
          {this.state.dealers.map(function(object, i){
            return <option value={object}>{object}</option>;
          })}
        </select>
      </div>
    );
  }
}

export default LoginContainer;
