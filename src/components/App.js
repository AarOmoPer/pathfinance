import React from 'react';

import {Home, NewReport, ExistingReport} from './pageComponents'

class App extends React.Component{
  render(){
    return(
      <section>
        {/* <h1>Hello World!</h1> */}
        {/* <Home /> */}
        <NewReport />
      </section>
    )
  }
}

export default App;