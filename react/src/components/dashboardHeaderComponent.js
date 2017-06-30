  import React, { Component } from 'react';
  import LoginContainer from './loginContainer'
  import TopHeaderComponent from './topHeaderComponent'
  import '../App.css';


  class DashboardHeaderComponent extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return(
        <div>
          <TopHeaderComponent />
          <div className="bgImg">
            <div className='maxWidth'>
              <img className='HeaderArrow' src={require('./images/Arrow.png')}/>
              <h2 className='Plantworx'>PLANTWORX2017</h2>
              <h2 className='CustomerLeads'>CUSTOMERLEADS</h2>
            </div>
          </div>
        </div>

      );
    }
  }


  export default DashboardHeaderComponent;
