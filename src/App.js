import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './test/testing'
import LoginContainer from './components/loginContainer'
import DashboardContainer from './components/dashboardContainer';
import SingleLeadComponent from './components/singleLeadComponent';
//import { BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';



const App = () => (
  <div className='App'>
    <MyRoutes />
  </div>
)




export default App;



const MyRoutes = () => (
    <main>
      <Switch>
        <Route exact path='/' component={LoginContainer}/>
        <Route exact path='/dashboard' component={DashboardContainer}/>
        <Route path='/dashboard/:id' component={SingleLeadComponent}/>
      </Switch>
    </main>

)
