import React from 'react';

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
    const { removeContribution, updateCardCheque, updateCash } = this.props
    const {cheque, cash, card } = breakdown
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
            {!!contributors.length &&
              <section>
                <table>
                  <thead>
                    <th>#</th>
                    <th>Full name</th>
                    <th>Amount paid</th>
                    <th>Payment method</th>
                    <th>Remove payment</th>
                  </thead>
                  <tbody>
                    {contributors.map((contribution, index) =>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{contribution.fullName}</td>
                        <td>{'£' + contribution.amountPaid}</td>
                        <td>{contribution.paymentMethod}</td>
                        <td ><a onClick={() => removeContribution(collectionTitle, index)}>Remove</a></td>
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
            <input type='number' placeholder='value' value={cheque.value || ""} onChange={event => updateCardCheque(collectionTitle, 'cheque', 'value', event)} />
          </form>

          <section>
            <h4>Cash</h4>
            <CashBreakdown collectionTitle={collectionTitle} cashData={cash} updateCash={updateCash} />
          </section>

          <form>
            <h4>Card</h4>
            <input type='number' placeholder='quantity' value={card.quantity || ""} onChange={event => updateCardCheque(collectionTitle, 'card', 'quantity', event)} />
            <input type='number' placeholder='value' value={card.value || ""} onChange={event => updateCardCheque(collectionTitle, 'card', 'value', event)} />
          </form>
        </section>
        <hr />
      </section>
    )
  }

  handleNewContributionPropChange = (prop, event) => {
    const { newPayment } = this.state;
    newPayment[prop] = event.target.value;
    this.setState(newPayment)
  }

  handleNewContributionSubmit = event => {
    event.preventDefault()
    const { newPayment } = this.state;
    const { collectionTitle, addContribution } = this.props
    if (newPayment.fullName && newPayment.amountPaid) addContribution(collectionTitle, Object.assign({}, newPayment))
  }

}

export default Collection;