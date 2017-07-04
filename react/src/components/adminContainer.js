import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LeadsApi from '../api/leads';
import DashboardHeaderComponent from './dashboardHeaderComponent';
import DashboardContainer from './dashboardContainer'
import '../App.css';

class AdminContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      leads: ''
    }

    }
    componentWillMount(){
      if(this.state.leads){
        console.log('No data')
      }
    LeadsApi.allLeads(leads => {
      console.log(leads)
      this.setState({
        leads: leads.data
      }, function(){
        console.log(this.state)
      })
    })
  }

    render(){
      return(
        <div>
          <DashboardHeaderComponent />
          <div className='maxWidth maxWidthBorder'>
          //add RetrieveAllLeads to a component and pass the leads down to it using React
            <retrieveAllLeads data ={this.state.leads} />
          </div>
        </div>


    )
  }
}

function retrieveAllLeads(data){
  var row = [];

  if(data.length > 0){
    for(var i=0 ; i < data.length; i++){
      var stats='Not started';
      var completedlead= false
      if(typeof data[i].Status === 'object'){
        if(data[i].Status.update1.completed){
          stats='Update 1 submitted'
        }
        if(data[i].Status.update2.complete){
          stats='Update 2 submitted'
        }
        if(data[i].Status.update3.complete){
          stats='Update 3 submitted - Lead completed'
          completedlead=true
      }
    }
      row.push(
        <tr className={completedlead ? 'leadComplete': null} >
          <td>{data[i].Title + " " + data[i]['First Name'] + " " + data[i]['Last Name']} </td>
          <td>{data[i].Company}</td>
          <td>{stats}</td>
        </tr>
    )
  }
}
  return (
    <table className='dashboardTable'>
      <tr>
        <th className='cellBorder'>Name</th>
        <th className='cellBorder'>Company</th>
        <th className='cellBorder'>Status</th>
      </tr>
      {row}
    </table>

  )




}

export default AdminContainer;
