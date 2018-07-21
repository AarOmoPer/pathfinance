import React from 'react';

import { CashBreakdown } from '../staticComponents'

class NewCollection extends React.Component {
  state = {
    newPayment: {
      fullName: 'Jane',
      amountPaid: 20,
      paymentMethod: 'cheque'
    }
  }
  render() {
    const { newPayment } = this.state;
    const { collectionTitle, collectionData, updateCheque, removePayment, updateCashBreakdown, updateCard } = this.props
    const { payments, cheque, cash, card } = collectionData
    const cashValue = cash.reduce((acc, denomination) => { acc += (denomination.value * denomination.quantity); return acc }, 0)
    const paymentValue = payments.reduce((acc, payment) => { acc += Number(payment.amountPaid); return acc }, 0)
    const breakdownValue = (cheque.value + cashValue + card.value)
    return (
      <section>
        <h3>{collectionTitle + ' - £' + breakdownValue.toFixed(2)}</h3>
        {(!!payments.length && (paymentValue.toFixed(2) !== breakdownValue.toFixed(2))) && <label>Record total does not match breakdown total</label>}

        <form onSubmit={this.handleNewPaymentSubmit}>
          <input value={newPayment.fullName} onChange={event => this.handleNewPaymentPropChange('fullName', event)} placeholder='full name' />
          <input type='number' value={newPayment.amountPaid} onChange={event => this.handleNewPaymentPropChange('amountPaid', event)} placeholder='amount paid' />
          <select value={newPayment.paymentMethod} onChange={event => this.handleNewPaymentPropChange('paymentMethod', event)}>
            <option>cheque</option>
            <option>cash</option>
            <option>card</option>
          </select>
          <button type='submit'>add payment</button>
        </form>

        {!!payments.length &&
          <section>
            <h3>{'Record total - £' + paymentValue.toFixed(2)}</h3>
            <table>
              <thead>
                <th>#</th>
                <th>Full name</th>
                <th>Amount paid</th>
                <th>Payment method</th>
                <th>Remove payment</th>
              </thead>
              <tbody>
                {payments.map((payment, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{payment.fullName}</td>
                    <td>{'£' + payment.amountPaid}</td>
                    <td>{payment.paymentMethod}</td>
                    <td onClick={() => removePayment(collectionTitle, index)}>Remove</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        }

        <section>
          <form>
            <h4>Cheque</h4>
            <input type='number' placeholder='quantity' value={cheque.quantity} onChange={event => updateCheque(collectionTitle, 'quantity', event)} />
            <input type='number' placeholder='value' value={cheque.value} onChange={event => updateCheque(collectionTitle, 'value', event)} />
          </form>

          <section>
            <h4>Cash</h4>
            <CashBreakdown collectionTitle={collectionTitle} breakdown={cash} updateCashBreakdown={updateCashBreakdown} />
          </section>

          <form>
            <h4>Card</h4>
            <input type='number' placeholder='quantity' value={card.quantity} onChange={event => updateCard(collectionTitle, 'quantity', event)} />
            <input type='number' placeholder='value' value={card.value} onChange={event => updateCard(collectionTitle, 'value', event)} />
          </form>
        </section>
        <hr />
      </section>
    )
  }

  handleNewPaymentPropChange = (prop, event) => {
    const { newPayment } = this.state;
    newPayment[prop] = event.target.value;
    this.setState(newPayment)
  }

  handleNewPaymentSubmit = event => {
    event.preventDefault()
    const { newPayment } = this.state;
    const { collectionTitle, addPayment } = this.props
    if (newPayment.fullName && newPayment.amountPaid) addPayment(collectionTitle, Object.assign({}, newPayment))
  }

}

export default NewCollection;