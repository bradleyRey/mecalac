//make header component
//import header component
//read up on react router
//when clicking the login button, direct user to dashboard and display their name from the state
import React, { Component } from 'react';
import DashboardHeaderComponent from './dashboardHeaderComponent'
import '../App.css';
import * as data from '../api/leads.json'

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName : " ",
      testData:data,
    };
  }

  render() {



    return(
      <div>
        <DashboardHeaderComponent />
        <div className="maxWidth maxWidthBorder">
        <TitleAboveTable />
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
    rows.push(
      <tr>
        <td>{data[i].Title + " " + data[i].FirstName + " " + data[i].LastName} </td>
        <td>{data[i].EmailAddress}</td>
        <td>{data[i].TelephoneNumber}</td>
        <td>{data[i].MobileNumber}</td>
        <td>{data[i].Company}</td>
        <td>{data[i].Status}</td>
        <td className='center'><img className='tick' src={require('./images/completedtick.png')}/></td>
        <td><button className='btn updateBtn'>Update Here</button></td>
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

const TitleAboveTable = () => (

    <div>
      <img  className='HeaderArrowSmall' src={require('./images/Arrow.png')}/>
        <h3 className='SmallTitle'>BALGOWNIE</h3>
        <h3 className='SmallTitleLeads'>CUSTOMER LEADS</h3>

    </div>

    )

const Footer = (props) => {
  console.log('PROPS', props)
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
