import React from 'react';
import Moment from 'moment';
import { NewCollection, Deductions } from '../subComponents'

class NewReport extends React.Component {
  state = {
    newCollection: {
      title: 'sam',
    },
    collections: {},
    deductions: []
  }
  render() {
    const { newCollection, collections, deductions } = this.state
    const totalReportBreakdown = this.calculateTotalBreakdown()
    const totalReportValue = (totalReportBreakdown.cheque + totalReportBreakdown.cash + totalReportBreakdown.card).toFixed(2)
    const totalDeductionValue = this.calculateTotalDeduction().toFixed(2)
    return (
      <section>
        <h2>{Moment().format('dddd, MMMM Do YYYY') + ' - £' + totalReportValue}</h2>

        <section>
          <label >Add new a collection</label>
          <form onSubmit={this.handleNewCollectionSubmit}>
            <input type='text' placeholder='Collection title' value={newCollection.title} onChange={this.handleCollectionTitle} />
            <button type='submit'>Add collection</button>
          </form>
        </section>
        <section>
          {Object.keys(collections).map((title, index) => <NewCollection key={index}
            collectionTitle={title}
            collectionData={collections[title]}
            addPayment={this.addPayment}
            removePayment={this.removePayment}
            updateCheque={this.updateCheque}
            updateCashBreakdown={this.updateCashBreakdown}
            updateCard={this.updateCard} />
          )}
        </section>
        <section>
          <Deductions deductionData={deductions} deductionValue={totalDeductionValue} addDeduction={this.addDeduction} removeDeduction={this.removeDeduction} />
        </section>
        <section>
          <h2>Total for all collections: £{totalReportValue}</h2>
          <h2>Total for all deductions: £{totalDeductionValue}</h2>
          <h2>To bank: £{(Number(totalReportValue) - Number(totalDeductionValue)).toFixed(2)}</h2>
        </section>

      </section>
    )
  }

  addDeduction = deductionData => {
    const { deductions } = this.state;
    deductions.push(deductionData);
    this.setState({ deductions })
  }

  removeDeduction = deductionIndex => {
    const { deductions } = this.state;
    const filteredDeductions = deductions.filter((deduction, index) => index !== deductionIndex)
    this.setState({ deductions: [...filteredDeductions] })
  }

  addPayment = (title, paymentData) => {
    const { collections } = this.state;
    collections[title].payments.push(paymentData)
    this.setState({ collections })
  }

  removePayment = (title, paymentIndex) => {
    const { collections } = this.state;
    collections[title].payments = collections[title].payments.filter((payment, index) => index !== paymentIndex)
    this.setState({ collections })
  }

  updateCheque = (title, prop, event) => {
    const { collections } = this.state;
    collections[title]['cheque'][prop] = Number(event.target.value);
    this.setState({ collections })
  }

  updateCashBreakdown = (title, index, event) => {
    const { collections } = this.state;
    collections[title]['cash'][index].quantity = Number(event.target.value);
    this.setState({ collections });
  }

  updateCard = (title, prop, event) => {
    const { collections } = this.state;
    collections[title]['card'][prop] = Number(event.target.value);
    this.setState({ collections })
  }


  handleCollectionTitle = event => {
    const { newCollection } = this.state;
    newCollection.title = event.target.value;
    this.setState({ newCollection })
  }

  handleNewCollectionSubmit = event => {
    event.preventDefault()
    const { newCollection, collections } = this.state;
    if (newCollection.title) {
      if (!Object.keys(collections).includes(newCollection.title.toLowerCase())) {
        collections[newCollection.title.toLowerCase()] = this.generateCollectionObject()
        this.setState({
          collections, newCollection: {
            title: "",
          }
        })
      } else {
        console.log('collection already exists')
        // error message, name has been used already
      }
    }
  }

  calculateTotalBreakdown = () => {
    const { collections } = this.state;
    const total = {
      cheque: 0,
      cash: 0,
      card: 0,
    }
    for (const collection in collections) {
      total.cheque += collections[collection].cheque.value;
      total.cash += collections[collection].cash.reduce((acc, denomination) => { acc += (Number(denomination.value) * Number(denomination.quantity)); return acc }, 0);
      total.card += collections[collection].card.value;
    }
    return total
  }

  calculateTotalDeduction = () => {
    const { deductions } = this.state;
    return deductions.reduce((acc, deduction) => { acc += Number(deduction.amountPaid); return acc }, 0)
  }

  generateCollectionObject = () => Object.assign({}, {
    payments: [
    ],
    cheque: {
      quantity: 0,
      value: 0
    },
    cash: [
      { value: 50, quantity: 0 },
      { value: 20, quantity: 0 },
      { value: 10, quantity: 0 },
      { value: 5, quantity: 0 },
      { value: 2, quantity: 0 },
      { value: 1, quantity: 0 },
      { value: 0.5, quantity: 0 },
      { value: 0.2, quantity: 0 },
      { value: 0.1, quantity: 0 },
      { value: 0.05, quantity: 0 },
      { value: 0.02, quantity: 0 },
      { value: 0.01, quantity: 0 },
    ],
    card: {
      quantity: 0,
      value: 0
    }
  })
}

export default NewReport;