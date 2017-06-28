//make header component
//import header component
//read up on react router
//when clicking the login button, direct user to dashboard and display their name from the state
import React, { Component } from 'react';
import DashboardHeaderComponent from './dashboardHeaderComponent'
import { Link } from 'react-router-dom'

import '../App.css';
import LeadsApi from '../api/leads'
import * as data from '../server/leads.json'


class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state
    this.state.testData = ''
  }

  componentWillMount(){
    if(!localStorage['mecLoggedIn']){
      console.log('Not logged in')
    }

    //api call
    LeadsApi.getLeads(this.state.userdata.dealerid, leads => {
      this.setState({
        testData: leads
      }, function(){
        console.log('STATE', this.state);
      })
    });

  }

  render() {
    return(
      <div>
        <DashboardHeaderComponent />
        <div className="maxWidth maxWidthBorder">
        <TitleAboveTable username={localStorage['mecDealerName']} />
          {getNewData(this.state.testData)}
        </div>
        <Footer test={this.state.testData} test2={"I am test 2"}/>
      </div>
    );
  }
}

function getNewData(data) {
  var rows = [];
  for (var i = 0; i < data.length; i++) {
    //if()
    rows.push(
      <tr>
        <td>{data[i].Title + " " + data[i].FirstName + " " + data[i].LastName} </td>
        <td>{data[i].EmailAddress}</td>
        <td>{data[i].TelephoneNumber}</td>
        <td>{data[i].MobileNumber}</td>
        <td>{data[i].Company}</td>
        <td>{data[i].Status}</td>
        <td className='center'><img className='tick' src={require('./images/completedtick.png')}/></td>
        <td><Link to={`/viewlead/${data[i].LeadId}`} className='btn updateBtn'>Update Here</Link></td>
      </tr>
    );
  }
  return (<table className="dashboardTable">
    <tr>
      <th className="cellBorder">Name</th>
      <th className='cellBorder'>Email</th>
      <th className='cellBorder'>Tel no</th>
      <th className='cellBorder'>Mob no</th>
      <th className='cellBorder'>Company</th>
      <th className='cellBorder'>Status</th>
      <th className='cellBorder' >Completed</th>
      <th></th>
    </tr>
    {rows}
  </table>

)};

const TitleAboveTable = (props) => {
  return(
    <div>
      <img  className='HeaderArrowSmall' src={require('./images/Arrow.png')}/>
        <h3 className='SmallTitle'>{props.username}</h3>
        <h3 className='SmallTitleLeads'>CUSTOMER LEADS</h3>

    </div>
  )
}

const Footer = (props) => {
  return (
    <div>
      <div className='Footer'>
        <img className='mecalacFooter' src={require('./images/Logo.png')}/>
        <div className='socialMedia'>
          <img className='facebook' src={require('./images/Facebooklogo.png')}/>
          <img className='linkedinlogo' src={require('./images/linkedinlogo.png')}/>
          <img className='youtubelogo' src={require('./images/youtubelogo.png')}/>
        </div>
      </div>
    </div>
  )

}

export default DashboardContainer;
