import React, { Component } from 'react';
import DashboardHeaderComponent from './dashboardHeaderComponent'
import '../App.css';
import DashboardContainer from './dashboardContainer'
import TitleAboveTable from './dashboardContainer'

class SingleLeadComponent extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

    render() {
        return(
          <div>
              <DashboardHeaderComponent />
              <div className="maxWidth">
              <NewTableLead />
              </div>
          </div>
        );
      }
     }


     const NewTableLead = () => (
       <div>
         <table className='dashboardTable'>
          <tr className='TableHeaderSingle'>
            <th className='cellBorder'></th>
            <th className='cellBorder'>Date</th>
            <th className='cellBorder'>Task Taken Place</th>
            <th className='cellBorder'>Next Action Requirements</th>
            <th></th>
          </tr>
          <tr>
            <td><UpdateBox /></td>
          </tr>
         </table>
       </div>
     )

     const UpdateBox = () => (
       <div>
        <div className='update1'>UPDATE1</div>
        <div className='update2'>UPDATE2</div>
        <div className='update2'>UPDATE3</div>
       </div>
     )

export default SingleLeadComponent
