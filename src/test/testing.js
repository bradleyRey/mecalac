import React, { Component } from 'react';

class Test extends Component {
  constructor(props){
    super(props);
    this.state =  {
      date: new Date(),
      name: 'Brad',
      bool : true,
    };
  }
  render() {

    return (
      <div>
        <h1>Hello, my name is {this.state.name}. The day of the week is {this.state.date.getDate()}</h1>
        <h2>{this.state.bool}</h2>
      </div>
    )
  }
}



export default Test
