import React from 'react';
import Moment from 'moment';
import {db} from '../../firebase'
import { Collection, Deduction } from '../subComponents'

class CreateReport extends React.Component {
  state = {
    newCollection: {
      title: 'sam',
    },
    newDeduction: {
      description: 'kicks',
      value: 250
    },
    reportDate: Moment(Date.now()).format('YYYY-MM-DD'),
    collections: {},
    deductions: [],
  }

  componentDidMount(){
    const {reportDate} = this.state;
    db.getReportData(reportDate, reportData => this.setState({...reportData}))
  }

  render() {
    const { newCollection, newDeduction, reportDate, collections, deductions } = this.state
    return (
      <section>
        <h2>{Moment(reportDate).format('dddd, MMMM Do YYYY HH:ss')}</h2>

        <section>
          <h3>Collections</h3>
          <label >Add new a collection:</label>
          <form onSubmit={this.addCollection}>
            <input type='text' placeholder='Collection title' value={newCollection.title} onChange={this.handleNewCollectionPropChange} />
            <button type='submit'>Add collection</button>
          </form>
          <section>
            {Object.values(collections).map((collection, index) => <Collection key={index} {...collection} reportDate={reportDate} />)}
          </section>
        </section>

        <section>
          <h3>Deductions</h3>
          <label >Add new a deduction:</label>
          <form onSubmit={this.addDeduction}>
            <input value={newDeduction.description} onChange={event => this.handleNewDeductionPropChange('description', event)} placeholder='description' />
            <input type='number' value={newDeduction.value || ''} onChange={event => this.handleNewDeductionPropChange('value', event)} placeholder='amount paid' />
            <button type='submit'>Add deduction</button>
          </form>
          <section>
            <Deduction deductionData={deductions} removeDeduction={this.removeDeduction}/>
          </section>
        </section>

        <section>
          <h3>Total</h3>
          <label></label>
        </section>
        <hr />
      </section>
    )
  }

  handleNewCollectionPropChange = event => {
    const { newCollection } = this.state;
    newCollection.title = event.target.value;
    this.setState({ newCollection })
  }
  handleNewDeductionPropChange = (prop, event) => {
    const { newDeduction } = this.state;
    newDeduction[prop] = prop === 'value' ? Number(event.target.value) : event.target.value;
    this.setState({ newDeduction })
  }


  // Report methods
  addCollection = event => {
    event.preventDefault()
    const { newCollection, reportDate } = this.state;
    db.addCollection(reportDate, newCollection.title)
  }
  removeCollection = collectionTitle => {
    const { reportDate } = this.state
    db.removeCollection(reportDate, collectionTitle)
  }

  addDeduction = event => {
    event.preventDefault()
    const { newDeduction, reportDate } = this.state;
    db.addDeduction(reportDate, newDeduction)
  }
  removeDeduction = deductionKey => {
    const {reportDate} = this.state
    db.removeDeduction(reportDate ,deductionKey)
  }


  // calculateDeductionTotal = deductions => deductions.reduce((acc, deduction) => acc += deduction.value, 0)
  // calculateReportTotal = collections => {
  //   let cardTotal = 0;
  //   let chequeTotal = 0;
  //   let cashTotal = 0
  //   for (const collection in collections){
  //     cardTotal += collections[collection].breakdown.card.value
  //     chequeTotal += collections[collection].breakdown.cheque.value
  //     for (const denomination in collections[collection].breakdown.cash){
  //       cashTotal += Number(denomination) * collections[collection].breakdown.cash[denomination]
  //     }
  //   }
  //   return {cashTotal, chequeTotal, cardTotal, reportTotal: cashTotal + chequeTotal + cardTotal}
  // }
}

export default CreateReport;