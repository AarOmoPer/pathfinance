import React from 'react';
import Moment from 'moment';
import { db, auth } from '../../firebase'
import { AuthContext } from '../Context'
import { Authorization } from '../higherOrderComponents'
import { withRouter } from 'react-router-dom'


class Home extends React.Component {
  state = {
    isANewReport: true,
    reportDate: Moment().format('YYYY-MM-DD'),
  }
  render() {
    const { reportDate, isANewReport } = this.state
    // console.log(isANewReport)
    return (
      <Authorization>
        <AuthContext.Consumer>
          {context =>
            <form onSubmit={this.handleSubmit}>
              <button type='button' onClick={auth.signOut}>Sign out</button>
              <h2>Pathfinance</h2>
              <p>Welcome {context.user && context.user.email}</p>
              <section>
                <label>Please select the operation you would like to perform.</label>
                <button type='button' onClick={() => this.setOperationType(true)}>Contribute to a new report</button>
                <button type='button' onClick={() => this.setOperationType(false)}>Open a previous report</button>
                {/* <button type='button' onClick={() => this.setOperationType(false)}>Edit a previous report</button> */}
              </section>

              <section>
                <label>Please enter the date of the report:</label>
                <input type='date' value={reportDate} onChange={this.handleReportDate} />
              </section>

              <button type='submit'>Proceed</button>
            </form>
          }
        </AuthContext.Consumer>
      </Authorization>
    )
  }
  handleSubmit = event => {
    event.preventDefault()
    const { isANewReport, reportDate } = this.state;
    const { history } = this.props
    history.push(`/report/${reportDate}`)
    console.log(isANewReport, reportDate)
  }
  handleReportDate = event => this.setState({ reportDate: event.target.value })
  setOperationType = isANewReport => this.setState({ isANewReport })
}

export default withRouter(Home);