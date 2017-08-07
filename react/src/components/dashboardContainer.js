import React, { Component } from 'react';
import DashboardHeaderComponent from './dashboardHeaderComponent'
import { Link } from 'react-router-dom'
import '../App.css';
import LeadsApi from '../api/leads'


class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.userData,
      leads: ''
    }
  }

  componentWillMount(){
    if(!localStorage['mecLoggedIn']){
      console.log('Not logged in')
    }

    //api call
    LeadsApi.getLeads(localStorage['mecDealerId'], leads => {
      console.log(leads,"LEADS")
      this.setState({
        leads: leads.data
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
          {getNewData(this.state.leads)}
        </div>
        <Footer test={this.state.leads} test2={"I am test 2"}/>
      </div>
    );
  }
}

function getNewData(data) {
  var rows = [];
  if(data.length > 0){
    console.log(data,'DATA')

    for (var i = 0; i < data.length; i++) {
      var updateStatus = 'Not started'
      var leadComplete = false;
      if(typeof data[i].Status === 'object'){
        if(data[i].Status.update1.complete){
          updateStatus = 'Update 1 submitted'
        }
        if(data[i].Status.update2.complete){
          updateStatus = 'Update 2 submitted'
        }
        if(data[i].Status.update3.complete){
          updateStatus = 'Update 3 submitted'
          leadComplete = true
        }
      }


      rows.push(
        <tr className={leadComplete ? "leadComplete": null} >
          <td>{data[i].Title + " " + data[i]['First Name'] + " " + data[i]['Last Name']} </td>
          <td>{data[i]['Email Address']}</td>
          <td>{data[i]['Telephone Number']}</td>
          <td>{data[i]['Mobile Number']}</td>
          <td>{data[i].Company}</td>
          <td>{updateStatus}</td>
          <td className='center'>
            {leadComplete ? (
              <img className='tick' src={require('./images/completedtick.png')}/>
            ) : (
              null
            )}
          </td>
          {leadComplete ? (
            <td><Link to={`/viewlead/${data[i].Lead_Id}`} className='btn updateBtn seeAction'>See actions</Link></td>
          ) : (
            <td><Link to={`/viewlead/${data[i].Lead_Id}`} className='btn updateBtn'>Update Here</Link></td>
          )}
        </tr>
      );
    }
  }
  return (
    <table className="dashboardTable">
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
  )
};

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
          <a href="https://www.facebook.com/pages/Mecalac/539301466114716"><img className='facebook' src={require('./images/Facebooklogo.png')}/></a>
          <a href="https://www.linkedin.com/company/9473367"><img className='linkedinlogo' src={require('./images/linkedinlogo.png')}/></a>
          <a href="https://www.youtube.com/user/MecalacTV"><img className='youtubelogo' src={require('./images/youtubelogo.png')}/></a>
        </div>
      </div>
    </div>
  )

}

export default DashboardContainer;
