import React from 'react';
import { AuthContext } from '../Context'
import {withRouter} from 'react-router-dom'

class Authorization extends React.Component {
  render() {
    const {history} = this.props
    return (
      <AuthContext.Consumer>
        {context => context.user ? this.props.children : history.push('/')}
      </AuthContext.Consumer>
    )
  }
}

export default withRouter(Authorization)