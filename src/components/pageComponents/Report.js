import React from 'react';
import Moment from 'moment';
import { db } from '../../firebase'
import { Collection, Deduction, Total } from '../subComponents'
import { Authorization } from '../higherOrderComponents'
import { getReportState } from '../functions'
import { withRouter, Link } from 'react-router-dom'

class Report extends React.Component {
  state = {
    newCollection: {
      title: 'Offering',
    },
    newDeduction: {
      description: 'Transport',
      value: 2500
    },
    // this prop will be used to flip between viewing and editing the report
    reportIsReadOnly: false,

    reportDate: '',
    collections: {},
    deductions: [],
  }

  componentDidMount() {
    const { history } = this.props
    const givenDate = history.location.pathname.split('/')[2]
    const formatedDate = Moment(givenDate).format("YYYY-MM-DD")
    console.log(givenDate, formatedDate)
    if (givenDate && formatedDate !== 'Invalid date') {
      db.getReportData(formatedDate, reportData => this.setState({ ...getReportState(reportData, formatedDate) }))
    } else {
      history.push('/home')
    }
  }

  render() {
    const { newCollection, newDeduction, reportDate, collections, deductions } = this.state
    return (
      <Authorization>
        <section>
          <Link to='/home'>Return home</Link>
          <h2>{Moment(reportDate).format('dddd, MMMM Do YYYY')}</h2>

          <section>
            <h3>Collections</h3>
            <section>
              <label>Add a new collection:</label>
              <section>
                <input type='text' placeholder='Collection title' value={newCollection.title} onChange={this.handleNewCollectionPropChange} />
                <button type='button' onClick={this.addCollection}>Add collection</button>
              </section>
            </section>
            <section>
              {Object.values(collections).map((collection, index) => <Collection key={index} {...collection} reportDate={reportDate} removeCollection={this.removeCollection} />)}
            </section>
          </section>

          <section>
            <h3>Deductions</h3>
            <section>
              <label>Add a new deduction:</label>
              <section>
                <input value={newDeduction.description} onChange={event => this.handleNewDeductionPropChange('description', event)} placeholder='description' />
                <input type='number' value={newDeduction.value / 100 || ''} onChange={event => this.handleNewDeductionPropChange('value', event)} placeholder='amount paid' />
                <button type='button' onClick={this.addDeduction}>Add deduction</button>
              </section>
            </section>
            <section>
              <Deduction deductionData={deductions} removeDeduction={this.removeDeduction} />
            </section>
          </section>

          <section>
            <h3>Total</h3>
            <label>See breakdown total</label>
            <section>
              <Total collections={collections} deductions={deductions} />
            </section>
          </section>
          <hr />
        </section>
       </Authorization>
    )
  }

  handleNewCollectionPropChange = event => {
    const { newCollection } = this.state;
    newCollection.title = event.target.value;
    this.setState({ newCollection })
  }
  handleNewDeductionPropChange = (prop, event) => {
    const { newDeduction } = this.state;
    newDeduction[prop] = prop === 'value' ? Number(event.target.value) * 100 : event.target.value;
    this.setState({ newDeduction })
  }

  addCollection = event => {
    event.preventDefault()
    const { newCollection, reportDate } = this.state;
    db.addCollection(reportDate, newCollection.title)
  }
  removeCollection = collectionTitle => {
    const { reportDate } = this.state
    db.removeCollection(reportDate, collectionTitle.toLowerCase())
  }

  addDeduction = event => {
    event.preventDefault()
    const { newDeduction, reportDate } = this.state;
    db.addDeduction(reportDate, newDeduction)
  }
  removeDeduction = deductionKey => {
    const { reportDate } = this.state
    db.removeDeduction(reportDate, deductionKey)
  }
}

export default withRouter(Report);