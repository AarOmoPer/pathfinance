import React from 'react';

class Deductions extends React.Component {
  state = {
    newDeduction: {
      description: 'kicks',
      amountPaid: 250
    }
  }
  render() {
    const { newDeduction } = this.state;
    const { deductionData, removeDeduction, deductionValue } = this.props
    return (
      <section>
        <h3>Deductions - £{deductionValue}</h3>

        <form onSubmit={this.handleNewDeductionSubmit}>
          <input value={newDeduction.description} onChange={event => this.handleNewDeductionPropChange('description', event)} placeholder='deduction description' />
          <input value={newDeduction.amountPaid} onChange={event => this.handleNewDeductionPropChange('amountPaid', event)} placeholder='amount paid' />
          <button type='submit'>Register deduction</button>
        </form>

        <table>
          <thead>
            <th>#</th>
            <th>Description of deduction</th>
            <th>Amount paid</th>
            <th>Remove deduction</th>
          </thead>
          <tbody>
            {deductionData.map((deduction, index) => <tr>
              <td>{index + 1}</td>
              <td>{deduction.description}</td>
              <td>{deduction.amountPaid}</td>
              <td onClick={() => removeDeduction(index)}>Remove</td>
            </tr>)}
          </tbody>
        </table>
        <hr />
      </section>
    )
  }

  handleNewDeductionPropChange = (prop, event) => {
    const { newDeduction } = this.state;
    newDeduction[prop] = event.target.value;
    this.setState(newDeduction)
  }

  handleNewDeductionSubmit = event => {
    const { addDeduction } = this.props;
    const { newDeduction } = this.state;
    event.preventDefault()
    if (newDeduction.description && newDeduction.amountPaid) addDeduction(Object.assign({}, newDeduction))
  }
}

export default Deductions;