import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import Forecast from './Forecast';
import DailyDetails from './DailyDetails';


class App extends Component {

   render() {
    return (
      < BrowserRouter>
        <div className="main-container">
          <Route path='/' component={NavBar} />
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/forecast' component={Forecast} />
                  <Route exact path='/forecast/details' component={DailyDetails} />
                  <Route render={function () {
                      return <p>Not Found</p>
                  }} />
              </Switch>
        </div>
      </ BrowserRouter>
    );
  }
}

export default App;