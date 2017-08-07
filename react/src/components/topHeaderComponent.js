import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link} from 'react-router-dom';

import '../App.css';


const TopHeaderComponent = () => (
  <div className='TopHeader'>
    <div className='logoSize'>
      <a href="http://www.coventry-mecalac.co.uk/"><img className="Logo" src={require('./images/Logo.png')}/></a>
      {(localStorage['mecLoggedIn']) ? <Link to="/logout" className="btn logoutBtn">Logout</Link> : null }
    </div>
  </div>
)

export default TopHeaderComponent;
