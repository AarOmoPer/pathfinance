import React from 'react';
import {auth} from '../../firebase/firebase'
import {AuthContext} from '../Context'
import {withRouter} from 'react-router-dom'

class Authentication extends React.Component {
  state = {
    user: null
  }

  componentDidMount(){
    const {history} = this.props;
    auth.onAuthStateChanged(user => {
      if(!!user){
        this.setState({user});
        // console.log(user)
        history.push('/report')
        console.log(`${user.email} has signed in`)
      }else{
        this.setState({user: null});
        console.log('user has signed out')
      }
    })
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default withRouter(Authentication)