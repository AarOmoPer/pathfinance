import React from 'react';
import { db } from '../../firebase'
import { CashBreakdown, CollectionContributors } from '../staticComponents'

class Collection extends React.Component {
  state = {
    newPayment: {
      fullName: 'Jane',
      amountPaid: 200,
      paymentMethod: 'card'
    }
  }
  render() {
    const { newPayment } = this.state;
    const { collectionTitle, contributors, breakdown, removeCollection } = this.props
    const { cheque, cash, card } = breakdown
    return (
      <section className='message is-dark'>
        <div class="message-header">
          <p>{collectionTitle}</p>
          <p className="delete" onClick={() => removeCollection(collectionTitle)}>Remove Collection</p>
        </div>
        {/* Contributors */}
        <section className='message-body'>

          <section>
            <section className="content no-print">
              <label className="subtitle is-6">Add a new contributor:</label>
              <section className="field">
                <p className="control">
                  <input className='input' value={newPayment.fullName} onChange={event => this.handleNewContributionPropChange('fullName', event)} placeholder='Full name' />
                </p>
              </section>
              <section className="field">
                <p className="control">
                  <input className='input' type='number' value={newPayment.amountPaid / 100 || ''} onChange={event => this.handleNewContributionPropChange('amountPaid', event)} placeholder='Amount paid' />
                </p>
              </section>
              <section className="field">
                <p className="control">
                  <section className='select'>
                    <select value={newPayment.paymentMethod} onChange={event => this.handleNewContributionPropChange('paymentMethod', event)}>
                      <option value='cheque'>Cheque</option>
                      <option value='cash'>Cash</option>
                      <option value='card'>Card</option>
                    </select>
                  </section>
                </p>
                <p className="control">
                  <button className="button is-dark" type='button' onClick={this.handleNewContributionSubmit}>Add payment</button>
                </p>
              </section>
            </section>
            <section className="">
              {contributors && !!Object.keys(contributors).length && <CollectionContributors contributors={contributors} removeContribution={this.removeContribution} />}
            </section>
          </section>
          <hr />
          {/* Breakdown */}
          <section className="">
            <section>
              <label className="subtitle is-6">Cheque:</label>
              <section className="field">
                <p className="control">
                  <input className="input" type='number' placeholder='Quantity' value={cheque.quantity || ""} onChange={event => this.updateCardCheque('cheque', 'quantity', event)} />
                </p>
              </section>
              <section class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    £
                    </a>
                </p>
                <p class="control is-expanded">
                  <input className="input" type='number' placeholder='Value' value={cheque.value / 100 || ""} onChange={event => this.updateCardCheque('cheque', 'value', event)} />
                </p>
              </section>
            </section>

            <hr />

            <section className="">
              <label className="subtitle is-6">Cash:</label>
              <CashBreakdown cashData={cash} updateCash={this.updateCash} />
            </section>

            <hr />

            <section>
              <label className="subtitle is-6">Card:</label>
              <section className="field">
                <p className="control">
                  <input className="input" type='number' placeholder='Quantity' value={card.quantity || ""} onChange={event => this.updateCardCheque('card', 'quantity', event)} />
                </p>
              </section>
              <section class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    £
                    </a>
                </p>
                <p class="control is-expanded">
                  <input className="input" type='number' placeholder='Value' value={card.value / 100 || ""} onChange={event => this.updateCardCheque('card', 'value', event)} />
                </p>
              </section>
            </section>
          </section>
        </section>
      </section>
    )
  }

  handleNewContributionPropChange = (prop, event) => {
    const { newPayment } = this.state;
    newPayment[prop] = prop === 'amountPaid' ? Number(event.target.value) * 100 : event.target.value;
    this.setState(newPayment)
  }

  handleNewContributionSubmit = event => {
    event.preventDefault()
    const { newPayment } = this.state;
    if (newPayment.fullName && newPayment.amountPaid) this.addContribution(Object.assign({}, newPayment))
  }


  addContribution = contributionData => {
    const { reportDate, collectionTitle } = this.props;
    db.addContribution(reportDate, collectionTitle, contributionData)
  }
  removeContribution = contributionKey => {
    const { reportDate, collectionTitle } = this.props;
    db.removeContribution(reportDate, collectionTitle, contributionKey)
  }
  updateCardCheque = (paymentMethod, prop, event) => {
    const { reportDate, collectionTitle } = this.props;
    const value = prop === 'value' ? Number(event.target.value) * 100 : Number(event.target.value);
    db.updateCardCheque(reportDate, collectionTitle, paymentMethod, prop, value)
  }
  updateCash = (denomination, event) => {
    const { reportDate, collectionTitle } = this.props;
    const value = Number(event.target.value);
    db.updateCash(reportDate, collectionTitle, denomination, value)
  }
}

export default Collection;