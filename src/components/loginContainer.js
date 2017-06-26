import React, { Component } from 'react';




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

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state)
    //return false;

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(this.state)

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
              <input type="submit" value="Submit" onClick={this.handleSubmit} />
          </form>
        </div>
    );
  };
}

export default LoginContainer;
