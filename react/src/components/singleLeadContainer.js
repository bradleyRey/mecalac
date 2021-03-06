import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import DashboardHeaderComponent from './dashboardHeaderComponent'
import { Link } from 'react-router-dom'
import '../App.css';
import DashboardContainer from './dashboardContainer'
import TitleAboveTable from './dashboardContainer'

import LeadsApi from '../api/leads'

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
    this.update2DateChange = this.update2DateChange.bind(this);
    this.update2ActivityChange = this.update2ActivityChange.bind(this);
    this.update2nextActionChange = this.update2nextActionChange.bind(this);
    this.update3DateChange = this.update3DateChange.bind(this);
    this.update3ActivityChange = this.update3ActivityChange.bind(this);
    this.update3nextActionChange = this.update3nextActionChange.bind(this);
    this.update3ClosingChange = this.update3ClosingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentWillMount(){
    if(!localStorage['mecLoggedIn']){
      console.log('Not logged in')
    }
    //set state param for current lead ID
    this.setState({
      leadid: this.props.currentLeadId
    }, () => {
      //get lead info and add to state
      LeadsApi.getLeadById(this.state.leadid, resp => {
        console.log("Get lead response: ", resp)
        if(typeof resp.data[0].Status === 'object'){
          this.setState({
            update1: {
              ...resp.data[0].Status.update1
            },
            update2: {
              ...resp.data[0].Status.update2
            },
            update3: {
              ...resp.data[0].Status.update3
            },
            leadComplete: resp.data[0].Status.leadComplete
          });

        }
      });
    })
  }

  update1DateChange(e) {
    e = moment(e).format('DD/MM/YYYY')
    this.setState({
      update1: {
        ...this.state.update1,
        date: e
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
  update2DateChange(e) {
    e = moment(e).format('DD/MM/YYYY')
    this.setState({
      update2: {
        ...this.state.update2,
        date: e,
       }
    });
  }
  update2ActivityChange(e) {
    this.setState({
      update2: {
        ...this.state.update2,
        activity: e.target.value
      }
    });
  }
  update2nextActionChange(e) {
    this.setState({
      update2: {
        ...this.state.update2,
        nextAction: e.target.value
      }
    });
  }
  update3DateChange(e) {
    e = moment(e).format('DD/MM/YYYY')
    this.setState({
      update3: {
        ...this.state.update3,
        date: e,
       }
    });
  }
  update3ActivityChange(e) {
    this.setState({
      update3: {
        ...this.state.update3,
        activity: e.target.value
      }
    });
  }
  update3nextActionChange(e) {
    this.setState({
      update3: {
        ...this.state.update3,
        nextAction: e.target.value
      }
    });
  }
  update3ClosingChange(e) {
    this.setState({
      update3: {
        ...this.state.update3,
        closing: e.target.value
      }
    });
  }

  handleSubmit(updateNum) {
    delete this.state.error;
    if(updateNum == 'update1' && (this.state.update1.date == null || this.state.update1.activity == null || this.state.update1.nextAction == null)){
      this.setState({
        error: 'You must fill in all fields.'
      })
      return false;
    }
    if(updateNum == 'update2' && (this.state.update2.date == null || this.state.update2.activity == null || this.state.update2.nextAction == null)){
      this.setState({
        error: 'You must fill in all fields.'
      })
      return false;
    }
    if(updateNum == 'completeLead' && (this.state.update3.date == null || this.state.update3.activity == null || this.state.update3.nextAction == null)){
      this.setState({
        error: 'You must fill in all fields.'
      })
      return false;
    }
    LeadsApi.submitLead(this.state.leadid, updateNum, this.state, resp => {
      console.log("Submit response: ", resp)
      if(resp.data.success){
        this.setState({
          update1: {
            ...resp.data.newState.Status.update1
          },
          update2: {
            ...resp.data.newState.Status.update2
          },
          update3: {
            ...resp.data.newState.Status.update3
          },
          leadComplete: resp.data.newState.Status.leadComplete
        });
      }else{
        this.setState({
          error: resp.data.error
        })
      }
    });
  }

  render() {
    return(
      <div>
          <DashboardHeaderComponent />
          <div className="maxWidth maxWidthBorder">
            {this.state.error ? (
              <div className="errorWrap">{this.state.error}</div>
            ) : (
              null
            )}
            {this.state.update1.complete ? (
              <Link to={{pathname: `/dashboard`, state: this.state}} className="btn backToLeadsTop">Back to leads</Link>
            ) : (
              null
            )}
            <table className='viewLeadTable'>
             <tr className='TableHeaderSingle'>
               <th className='cellBorder'></th>
               <th className='cellBorder'>Date</th>
               <th className='cellBorder'>Activity Taken Place</th>
               <th className='cellBorder'>Next Action Requirements</th>
               <th></th>
             </tr>
             <tr className={this.state.update1.complete ? 'completeRow' : ''}>
               <td>
                 <div className='updateBlock'>UPDATE 1</div>
               </td>
               <td>
                 {this.state.update1.complete ? (
                   <span className="completedInput">{this.state.update1.date}</span>
                 ) : (
                   <DatePicker value={this.state.update1.date || ''}  onChange={this.update1DateChange} />
                 )}
               </td>
               <td>
                 {this.state.update1.complete ? (
                   <span className="completedInput">{this.state.update1.activity}</span>
                 ) : (
                   <input type="text" value={this.state.update1.activity || ''} onChange={this.update1ActivityChange}  />
                 )}

               </td>
               <td>
                 {this.state.update1.complete ? (
                   <span className="completedInput">{this.state.update1.nextAction}</span>
                 ) : (
                   <input type="text" value={this.state.update1.nextAction || ''} onChange={this.update1nextActionChange}  />
                 )}

               </td>
               <td className="center">
                {this.state.update1.complete ? (
                  <img className='tick' src={require('./images/completedtick.png')}/>
                ) : (
                  <button className='btn updateBtn' onClick={() => this.handleSubmit('update1')}>Submit update</button>
                )}
               </td>
             </tr>
             <tr className={(this.state.update2.complete ? 'completeRow' : '') + (!this.state.update1.complete ? 'lockedRow' : '')}>
               <td>
                 <div className='updateBlock'>UPDATE 2</div>
               </td>
               <td>
                  <img className="lockIcon" src={require('./images/lockIcon.png')}/>
                 {this.state.update2.complete ? (
                   <span className="completedInput">{this.state.update2.date}</span>
                 ) : (
                   <DatePicker type="text" value={this.state.update2.date || ''} onChange={this.update2DateChange} />
                 )}
               </td>
               <td>
                 {this.state.update2.complete ? (
                   <span className="completedInput">{this.state.update2.activity}</span>
                 ) : (
                   <input type="text" value={this.state.update2.activity || ''} onChange={this.update2ActivityChange}  />
                 )}
               </td>
               <td>
                 {this.state.update2.complete ? (
                   <span className="completedInput">{this.state.update2.nextAction}</span>
                 ) : (
                   <input type="text" value={this.state.update2.nextAction || ''} onChange={this.update2nextActionChange}  />
                 )}
               </td>
               <td className="center">
                {this.state.update2.complete ? (
                  <img className='tick' src={require('./images/completedtick.png')}/>
                ) : (
                  <button className='btn updateBtn' onClick={() => this.handleSubmit('update2')}>Submit update</button>
                )}
               </td>
             </tr>
             <tr className={(this.state.update3.complete ? 'completeRow' : '') + (!this.state.update2.complete ? 'lockedRow' : '')}>
               <td>
                 <div className='updateBlock'>UPDATE 3</div>
               </td>
               <td>
                 <img className="lockIcon" src={require('./images/lockIcon.png')}/>
                 {this.state.update3.complete ? (
                   <span className="completedInput">{this.state.update3.date}</span>
                 ) : (
                   <DatePicker type="text" value={this.state.update3.date || ''} onChange={this.update3DateChange} />
                 )}
               </td>
               <td>
                 {this.state.update3.complete ? (
                   <span className="completedInput">{this.state.update3.activity}</span>
                 ) : (
                   <input type="text" value={this.state.update3.activity || ''} onChange={this.update3ActivityChange}  />
                 )}
               </td>
               <td>
                 {this.state.update3.complete ? (
                   <span className="completedInput">{this.state.update3.nextAction}</span>
                 ) : (
                   <input type="text" value={this.state.update3.nextAction || ''} onChange={this.update3nextActionChange}  />
                 )}
               </td>
               <td className="center closingCommentTd">
                <div className="closingCommentHead">Closing comment</div>
                  {this.state.update3.complete ? (
                    <span className="completedInput">{this.state.update3.closing}</span>
                  ) : (
                    <input type="text" value={this.state.update3.closing || ''} onChange={this.update3ClosingChange}  />
                  )}
               </td>
             </tr>
            </table>
            {(this.state.update2.complete && !this.state.leadComplete) ? (
              <button className="btn completeLeadBtn" onClick={() => this.handleSubmit('completeLead')}>Complete Lead</button>
            ) : (
              null
            )}
            {this.state.leadComplete ? (
              <Link to={{pathname: `/dashboard`, state: this.state}} className="btn completeLeadBtn">Back to leads</Link>
            ) : (
              null
            )}
          </div>
      </div>
    );
  }
}


export default SingleLeadComponent
