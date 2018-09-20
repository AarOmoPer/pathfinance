import React from 'react';
import {auth} from '../../firebase'

class SignIn extends React.Component{
  state = {
    email: 'test@test.me',
    pass: 'testuser',
  }
  render(){
    const {email, pass} = this.state
    return(
      <section>
        <input value={email} onChange={event => this.handleCredChange('email', event)} placeholder='email'/>
        <input type='password' value={pass} onChange={event => this.handleCredChange('pass', event)} placeholder='password'/>
        <button onClick={this.handleCredSubmit}>Sign in to me</button>
      </section>
    )
  }

  handleCredChange = (cred, event) => {
    const state = this.state;
    state[cred] = event.target.value;
    this.setState({...state})
  }

  handleCredSubmit = () => {
    const {email, pass} = this.state;
    const signInPromise = auth.signIn(email, pass)
    signInPromise.catch(console.log)
  }
}

export default SignIn