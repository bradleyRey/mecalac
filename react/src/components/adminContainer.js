import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LeadsApi from '../api/leads';
import DashboardHeaderComponent from './dashboardHeaderComponent';
import DashboardContainer from './dashboardContainer';
import '../App.css';
import _ from 'lodash';
var lodash = require('lodash')

class AdminContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      leads: 'There are no leads',
      stateObj2: 'Another one'
    }
  }
    componentWillMount(){
      if(this.state.leads){
      }
    LeadsApi.allLeads(leads => {
      console.log(leads,"LEADS")
      this.setState({
        leads: leads.data
      }, function(){
        })
    })
  }

    render(){
      return(
        <div>
          <DashboardHeaderComponent someProp={this.state.someStateObject} /> {/* access the prop inside the component, thereofre giving you the state from the parent */}
          <div className='maxWidth maxWidthBorder'>
            {//add RetrieveAllLeads to a component and pass the leads down to it using React
            }
            <LeadsAdminComponent leadsProp={this.state.leads} />
          </div>
        </div>
    )
  }
}


const LeadsAdminComponent = (props) => {

  const testing = (hello) => {
  //  console.log('hello',hello)
  }

  const handleClick = (e) => {

    if(e === 'ascend'){
      data = _.sortBy(data,[function(a){return a.Status}])
      console.log('ascending',data)
    }else{
      data = _.sortBy(data,[function(a){return a.Lead_Id}])
      console.log('descending',data)
    }
  }
  // this.testing('wokring')
  // Toggle button for ascending status

  //JS function to retrieve all leads to populate the table
  //passed the state down from the parent component AdminComponent using props in order to access the leads data
  //console.log('helooooo123123123')
  //console.log('props', props)
    var row = [];
    var data = props.leadsProp
    if(data.length > 0){
      for(var i=0 ; i < data.length; i++){
        var stats='Not started';
        var completedlead= false
        if(typeof data[i].Status === 'object'){
          //console.log(data[i])
          if(data[i].Status.update1.complete){
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
            <td><Link to={`/viewlead/${data[i].Lead_Id}`} className='btn updateBtn seeAction'>View Status</Link></td>
          </tr>
      )}


      return(
        <TableStatus status={row} handleClickPropAsc={() => handleClick('ascend')} handleClickPropDesc={() => handleClick('descending')}/>
      )
    }
  }

const TableStatus = (props) => {
  //console.log('statusprops',props)
  return(

    <div>
      <div className='wrapper'>
        <a className='ascending' onClick={props.handleClickPropAsc} >Ascending Order</a>
        <a className='descending' onClick={props.handleClickPropDesc}>Descending Order</a>
      </div>
      <table className='dashboardTable'>
        <tr>
          <th className='cellBorder'>Name</th>
          <th className='cellBorder'>Company</th>
          <th className='cellBorder'>Status</th>
          <th className='cellBorder'>Status</th>
        </tr>
        {props.status}
      </table>
    </div>

  )
}

export default AdminContainer;
