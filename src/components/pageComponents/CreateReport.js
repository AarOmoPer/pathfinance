import React from 'react';
import Moment from 'moment';
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
    reportDate: Date.now(),
    collections: {},
    deductions: [],
  }
  render() {
    const { newCollection, newDeduction, reportDate, collections, deductions } = this.state
    const collectionMethods = { addContribution: this.addContribution, removeContribution: this.removeContribution, updateCardCheque: this.updateCardCheque, updateCash: this.updateCash }
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
            {
              Object.values(collections).map((collection, index) => <Collection key={index} {...collection} {...collectionMethods} />)
            }
          </section>
        </section>

        <section>
          <h3>Deductions</h3>
          <label >Add new a deduction:</label>
          <form onSubmit={this.addDeduction}>
            <input value={newDeduction.description} onChange={event => this.handleNewDeductionPropChange('description', event)} placeholder='description' />
            <input type='number' value={newDeduction.value} onChange={event => this.handleNewDeductionPropChange('value', event)} placeholder='amount paid' />
            <button type='submit'>Add deduction</button>
          </form>
          <section>
            {
              deductions.map((deduction, index) => <Deduction key={index} deductionData={deductions} removeDeduction={() => this.removeDeduction(index)}/>)
            }
          </section>
        </section>

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
    const { newCollection, collections } = this.state;
    if (!(newCollection.title in collections)) {
      collections[newCollection.title.toLowerCase()] = this.generateNewCollectionObject(newCollection.title)
      newCollection.title = ''
      this.setState({ newCollection, collections })
    }
  }
  removeCollection = collectionTitle => {
    const { collections } = this.state
    delete collections[collectionTitle.toLowerCase()]
    this.setState({ collections })
  }
  addDeduction = event => {
    event.preventDefault()
    const { newDeduction, deductions } = this.state;
    deductions.push(Object.assign({}, newDeduction));
    newDeduction.description = ''
    newDeduction.value = 0
    this.setState({ newDeduction, deductions })
  }
  removeDeduction = deductionIndex => {
    const { deductions } = this.state;
    const filteredDeductions = deductions.filter((deduction, index) => index !== deductionIndex)
    this.setState({ deductions: [...filteredDeductions] })
  }
  generateNewCollectionObject = collectionTitle => Object.assign({}, {
    collectionTitle,
    contributors: [],
    breakdown: {
      cheque: {
        quantity: 0,
        value: 0
      },
      cash: {
        5000: 0,
        2000: 0,
        1000: 0,
        500: 0,
        200: 0,
        100: 0,
        50: 0,
        20: 0,
        10: 0,
        5: 0,
        2: 0,
        1: 0
      },
      card: {
        quantity: 0,
        value: 0
      }
    }
  })


  // Collection methods
  addContribution = (collectionTitle, contributionData) => {
    const { collections } = this.state;
    collections[collectionTitle.toLowerCase()]['contributors'].push(contributionData)
    this.setState({ collections })
  }
  removeContribution = (collectionTitle, contributionIndex) => {
    const { collections } = this.state;
    collections[collectionTitle.toLowerCase()]['contributors'] = collections[collectionTitle.toLowerCase()]['contributors'].filter((contribution, index) => index !== contributionIndex)
    this.setState({ collections })
  }
  updateCardCheque = (collectionTitle, paymentMethod, prop, event) => {
    const { collections } = this.state;
    collections[collectionTitle.toLowerCase()]['breakdown'][paymentMethod][prop] = Number(event.target.value);
    this.setState({ collections })
  }
  updateCash = (collectionTitle, denomination, event) => {
    const { collections } = this.state;
    collections[collectionTitle.toLowerCase()]['breakdown']['cash'][denomination] = Number(event.target.value);
    this.setState({ collections });
  }
}

export default CreateReport;