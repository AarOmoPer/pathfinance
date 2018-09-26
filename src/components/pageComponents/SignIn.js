import React from 'react';
import { auth } from '../../firebase'

class SignIn extends React.Component {
  state = {
    email: 'test@test.me',
    pass: 'testuser',
  }
  render() {
    const { email, pass } = this.state
    return (
      <section className='hero is-fullheight'>
        <section className='hero-body'>
          <section className='container has-text-centered'>
            <section className='column is-4 is-offset-4'>
              <h3 className="title is-large is-size-1 has-text-grey">Pathfinance</h3>
              <p className="subtitle is-size-6 has-text-grey">The pathfinder finance application.</p>
              <section className='field'>
                <section className='control'>
                  <input className='input is-medium' value={email} onChange={event => this.handleCredChange('email', event)} placeholder='email' />
                </section>
              </section>
              <section className='field'>
                <section className='control'>
                  <input className='input is-medium' type='password' value={pass} onChange={event => this.handleCredChange('pass', event)} placeholder='password' />
                </section>
              </section>
              <a className='button is-pulled-right is-block is-dark' onClick={this.handleCredSubmit}>Sign in</a>
            </section>
          </section>
        </section>
      </section>
    )
  }

  handleCredChange = (cred, event) => {
    const state = this.state;
    state[cred] = event.target.value;
    this.setState({ ...state })
  }

  handleCredSubmit = () => {
    const { email, pass } = this.state;
    const signInPromise = auth.signIn(email, pass)
    signInPromise.catch(console.log)
  }
}

export default SignIn