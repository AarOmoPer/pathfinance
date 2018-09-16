import React from 'react';
import Moment from 'moment';

import {db} from '../../firebase'

class Home extends React.Component {
  state = {
    isANewReport: true,
    reportDate: Moment().format('YYYY-MM-DD'),
  }
  render() {
    const { isANewReport, reportDate } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Pathfinance</h2>

        <section>
          <label>Please select the operation you would like to perform.</label>
          <button type='button' onClick={() => this.setOperationType(true)}>Make a new report</button>
          <button type='button' onClick={() => this.setOperationType(false)}>Open an existing report</button>
        </section>

        <section>
          <label>Please enter the date of the report:</label>
          <input type='date' value={reportDate} onChange={this.setReportDate} />
        </section>

        <button type='submit'>Proceed</button>
      </form>
    )
  }
  handleSubmit = event => {
    event.preventDefault()
    const {isANewReport, reportDate} = this.state;
    /* if it's a new report check if a report for said date already exists 
        if yes => ask user to open the old report instead?
        if no => start a new report
    */
   isANewReport && db.createNewReport(reportDate)
    console.log(isANewReport, reportDate)
  }
  setReportDate = event => this.setState({reportDate: event.target.value})
  setOperationType = isANewReport => this.setState({isANewReport})
}

export default Home;