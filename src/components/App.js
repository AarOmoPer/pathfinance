import React from 'react';

import {Home, CreateReport, ViewReport} from './pageComponents'

class App extends React.Component{
  render(){
    return(
      <section>
        {/* <h1>Hello World!</h1> */}
        {/* <Home /> */}
        <CreateReport />
      </section>
    )
  }
}

export default App;