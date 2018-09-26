import React from 'react';
import { Authentication } from './higherOrderComponents'
import { Report, SignIn } from './pageComponents'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Authentication >
          <Switch>
            <Route path='/report' component={Report} />
            <Route path='/' component={SignIn} />
          </Switch>
        </Authentication>
      </BrowserRouter>
    )
  }
}

export default App;