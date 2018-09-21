import React from 'react';
import Moment from 'moment';
import { auth } from '../../firebase'
import { AuthContext } from '../Context'
import { Authorization } from '../higherOrderComponents'
import { withRouter } from 'react-router-dom'


class Home extends React.Component {
  state = {
    editReport: false,
    reportDate: Moment().format('YYYY-MM-DD'),
  }
  render() {
    const { reportDate, editReport } = this.state
    console.log(editReport)
    return (
      <Authorization>
        <AuthContext.Consumer>
          {context =>
            <section >
              <button type='button' onClick={auth.signOut}>Sign out</button>
              <h2>Pathfinance</h2>
              <p>Welcome {context.user && context.user.email}</p>
              <section>
                <label>Please select the operation you would like to perform.</label>
                <button type='button' onClick={() => this.setOperationType(false)}>Contribute to a new report</button>
                <button type='button' onClick={() => this.setOperationType(true)}>Open a previous report</button>
              </section>

              <section>
                <label>Please enter the date of the report:</label>
                <input type='date' value={reportDate} onChange={this.handleReportDate} />
              </section>

              <button type='button' onClick={this.handleSubmit}>Proceed</button>
            </section>
          }
        </AuthContext.Consumer>
      </Authorization>
    )
  }
  handleSubmit = event => {
    event.preventDefault()
    const { editReport, reportDate } = this.state;
    const { history } = this.props;
    const openMode = editReport ? 'edit' : 'view';
    history.push(`/report/${reportDate}/${openMode}`)
  }
  handleReportDate = event => this.setState({ reportDate: event.target.value })
  setOperationType = isANewReport => this.setState({ isANewReport })
}

export default withRouter(Home);