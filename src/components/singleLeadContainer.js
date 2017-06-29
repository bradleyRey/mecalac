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
      update2: {},
      update3: {},
      leadComplete: false
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
    //set state param for current lead ID
    this.setState({
      leadid: this.props.match.params.id
    }, () => {
      //get lead info and add to state
      LeadsApi.getLeadById(this.state.leadid, resp => {
        this.setState({
          update1: {
            ...resp.currentStatus.update1
          },
          update2: {
            ...resp.currentStatus.update2
          },
          update3: {
            ...resp.currentStatus.update3
          },
          leadComplete: resp.currentStatus.leadComplete
        });
      });
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
      if(resp.success){
        this.setState({
          update1: {
            ...resp.currentStatus.update1
          },
          update2: {
            ...resp.currentStatus.update2
          },
          update3: {
            ...resp.currentStatus.update3
          }
        });
      }
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
             <tr className={this.state.update1.complete ? 'completeRow' : ''}>
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
                {this.state.update1.complete ? (
                  <img className='tick' src={require('./images/completedtick.png')}/>
                ) : (
                  <button className='btn updateBtn' onClick={this.handleSubmit1}>Submit update</button>
                )}
               </td>
             </tr>
            </table>
          </div>
      </div>
    );
  }
}


export default SingleLeadComponent
