import React from 'react';
import {Authentication} from './higherOrderComponents'
import {Home, Report, SignIn} from './pageComponents'

class App extends React.Component{
  render(){
    return(
      <Authentication >
        {/* <Home /> */}
        {/* <Report /> */}
        <SignIn />
      </Authentication>
    )
  }
}

export default App;