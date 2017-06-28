import React, { Component } from 'react';
import DashboardHeaderComponent from './dashboardHeaderComponent'
import '../App.css';
import DashboardContainer from './dashboardContainer'
import TitleAboveTable from './dashboardContainer'

import LeadsApi from '../api/leads'
import * as data from '../server/leads.json'

class SingleLeadComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      update1: {},
    };

    this.update1DateChange = this.update1DateChange.bind(this);
    this.update1ActivityChange = this.update1ActivityChange.bind(this);
    this.update1nextActionChange = this.update1nextActionChange.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);

  }
  componentWillMount(){
    if(!localStorage['mecLoggedIn']){
      console.log('Not logged in')
    }
    //get lead info
    LeadsApi.getLeadById(this.state.leadid, resp => {
      console.log(resp)
    });


    this.setState({
      ...this.state,
      leadid: this.props.match.params.id
    })

  }

  update1DateChange(e) {
    this.setState({
      update1: {
        ...this.state.update1,
        date: e.target.value,
       }
    });
  }
  update1ActivityChange(e) {
    this.setState({
      update1: {
        ...this.state.update1,
        activity: e.target.value
      }
    });
  }
  update1nextActionChange(e) {
    this.setState({
      update1: {
        ...this.state.update1,
        nextAction: e.target.value
      }
    });
  }

  handleSubmit1() {
    console.log(this.state)
    //axios request
    LeadsApi.submitLead(this.state.leadid, 'update1', this.state.update1, resp => {
      console.log(resp)
    });


  }

  render() {
    return(
      <div>
          <DashboardHeaderComponent />
          <div className="maxWidth">
            <table className='viewLeadTable'>
             <tr className='TableHeaderSingle'>
               <th className='cellBorder'></th>
               <th className='cellBorder'>Date</th>
               <th className='cellBorder'>Task Taken Place</th>
               <th className='cellBorder'>Next Action Requirements</th>
               <th></th>
             </tr>
             <tr>
               <td>
                 <div className='updateBlock'>UPDATE1</div>
               </td>
               <td>
                 <input type="text" value={this.state.update1.date || ''} onChange={this.update1DateChange} />
               </td>
               <td>
                 <input type="text" value={this.state.update1.activity || ''} onChange={this.update1ActivityChange}  />
               </td>
               <td>
                 <input type="text" value={this.state.update1.nextAction || ''} onChange={this.update1nextActionChange}  />
               </td>
               <td className="center">
                 <button className='btn updateBtn' onClick={this.handleSubmit1}>Submit update</button>
               </td>
             </tr>
            </table>
          </div>
      </div>
    );
  }
}


export default SingleLeadComponent
