import React from 'react';
import {db} from '../../firebase'
import { CashBreakdown } from '../staticComponents'

class Collection extends React.Component {
  state = {
    newPayment: {
      fullName: 'Jane',
      amountPaid: 20,
      paymentMethod: 'cheque'
    }
  }
  render() {
    const { newPayment } = this.state;
    const { collectionTitle, contributors, breakdown } = this.props
    const { cheque, cash, card } = breakdown
    const { updateCardCheque, updateCash } = this.props
    // const collectionTotal = this.calculateCollectionTotal(breakdown)
    return (
      <section>
        <hr />
        <h3>{collectionTitle}</h3>
        {/* Contributors */}
        <section>
          <label>Add a new contributor:</label>
          <form onSubmit={this.handleNewContributionSubmit}>
            <input value={newPayment.fullName} onChange={event => this.handleNewContributionPropChange('fullName', event)} placeholder='full name' />
            <input type='number' value={newPayment.amountPaid || ''} onChange={event => this.handleNewContributionPropChange('amountPaid', event)} placeholder='amount paid' />
            <select value={newPayment.paymentMethod} onChange={event => this.handleNewContributionPropChange('paymentMethod', event)}>
              <option>cheque</option>
              <option>cash</option>
              <option>card</option>
            </select>
            <button type='submit'>add payment</button>
          </form>
          <section>
            {contributors && !!Object.keys(contributors).length &&
              <section>
                <table>
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th>Full name</th>
                      <th>Amount paid</th>
                      <th>Payment method</th>
                      <th>Remove payment</th>
                    </tr>
                    {Object.keys(contributors).map((contributionKey, index) =>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{contributors[contributionKey].fullName}</td>
                        <td>{'£' + contributors[contributionKey].amountPaid}</td>
                        <td>{contributors[contributionKey].paymentMethod}</td>
                        <td ><a onClick={() => this.removeContribution(contributionKey)}>Remove</a></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            }
          </section>
        </section>
        {/* Breakdown */}
        <section>
          <form>
            <h4>Cheque</h4>
            <input type='number' placeholder='quantity' value={cheque.quantity || ""} onChange={event => updateCardCheque(collectionTitle, 'cheque', 'quantity', event)} />
            <input type='number' placeholder='value' value={cheque.value / 100 || ""} onChange={event => updateCardCheque(collectionTitle, 'cheque', 'value', event)} />
          </form>

          <section>
            <h4>Cash</h4>
            <CashBreakdown collectionTitle={collectionTitle} cashData={cash} updateCash={updateCash} />
          </section>

          <form>
            <h4>Card</h4>
            <input type='number' placeholder='quantity' value={card.quantity || ""} onChange={event => updateCardCheque(collectionTitle, 'card', 'quantity', event)} />
            <input type='number' placeholder='value' value={card.value / 100 || ""} onChange={event => updateCardCheque(collectionTitle, 'card', 'value', event)} />
          </form>
        </section>
        <hr />
      </section>
    )
  }

  handleNewContributionPropChange = (prop, event) => {
    const { newPayment } = this.state;
    newPayment[prop] = prop === 'amountPaid' ? Number(event.target.value) : event.target.value;
    this.setState(newPayment)
  }

  handleNewContributionSubmit = event => {
    event.preventDefault()
    const { newPayment } = this.state;
    if (newPayment.fullName && newPayment.amountPaid) this.addContribution(Object.assign({}, newPayment))
  }


  addContribution = contributionData => {
    const {reportDate, collectionTitle} = this.props;
    db.addContribution(reportDate, collectionTitle, contributionData)
  }
  removeContribution = contributionKey => {
    const {reportDate, collectionTitle} = this.props;
    db.removeContribution(reportDate, collectionTitle, contributionKey)
  }
  updateCardCheque = (collectionTitle, paymentMethod, prop, event) => {
    const { collections } = this.state;
    collections[collectionTitle.toLowerCase()]['breakdown'][paymentMethod][prop] = prop==='value' ? Number(event.target.value) * 100 : Number(event.target.value);
    this.setState({ collections })
  }
  updateCash = (collectionTitle, denomination, event) => {
    const { collections } = this.state;
    collections[collectionTitle.toLowerCase()]['breakdown']['cash'][denomination] = Number(event.target.value);
    this.setState({ collections });
  }


  // calculateCollectionTotal = breakdown => {
  //   const cardTotal = breakdown.card.value;
  //   const chequeTotal = breakdown.cheque.value;
  //   let cashTotal = 0
  //   for (const denomination in breakdown.cash){
  //     cashTotal += Number(denomination) * breakdown.cash[denomination]
  //   }
  //   return {cashTotal, chequeTotal, cardTotal, collectionTotal: cashTotal + chequeTotal + cardTotal}
  // }
}

export default Collection;