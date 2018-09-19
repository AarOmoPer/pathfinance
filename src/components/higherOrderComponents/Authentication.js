import React from 'react';
import {auth} from '../../firebase/firebase'
import {AuthContext} from '../Context' 

class Authentication extends React.Component {
  state = {
    user: null
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => console.log(user))
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default Authentication