import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './test/testing'
import LoginContainer from './components/loginContainer'
import DashboardContainer from './components/dashboardContainer';
import SingleLeadContainer from './components/singleLeadContainer';
import { BrowserRouter, Switch, Route, withRouter, Redirect} from 'react-router-dom';

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
        //The below implementation is for custom authentication. It's not done in the best way and was a quick fix to get the project out the door
        //When the /dashboard is accessed, the first render is done in the specified prop below. The props passed to that render are pnly avaliable
        //by passing the props in manually to the component we're loading if the user is logged in.
        <Route exact path='/dashboard' render={props => (
            localStorage['mecLoggedIn'] ? (
              <DashboardContainer userData={props.location.state} />
            ) : (
              <Redirect to={{
                pathname: '/'
              }}/>
            )
        )}/>

        <Route path='/viewlead/:id' render={props => {
          return (
          localStorage['mecLoggedIn'] ? (
            <SingleLeadContainer currentLeadId={props.match.params.id} />
          ) : (
            <Redirect to={{
              pathname: '/'
            }}/>
          )
        )
      }}/>
      </Switch>
    </main>
)
