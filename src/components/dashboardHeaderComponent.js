  //make header component
  //import header component
  //read up on react router
  //when clicking the login button, direct user to dashboard and display their name from the state
  import React, { Component } from 'react';
  import LoginContainer from './loginContainer'
  import '../App.css';


  class DashboardHeaderComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        customerName : " "
      };
    }

    render() {

      return(
        <div>
          <div className='Header'>
            <div className='TopHeader'>
              <div className='logoSize'>
                <img className="Logo" src={require('./images/Logo.png')}/>
              </div>
            </div>
          </div>
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
