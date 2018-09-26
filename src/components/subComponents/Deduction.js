import React from 'react';

class Deductions extends React.Component {
  render() {
    const { deductionData, removeDeduction } = this.props
    return (
      <section className="box scrollable-window">
        {!!Object.keys(deductionData).length && <table className="table is-narrow is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Description of deduction</th>
              <th>Amount paid</th>
              <th>Remove deduction</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(deductionData).map((deductionKey, index) => <tr key={index}>
              <td>{index + 1}</td>
              <td>{deductionData[deductionKey].description}</td>
              <td>£{(deductionData[deductionKey].value / 100).toFixed(2)}</td>
              <td><a onClick={() => removeDeduction(deductionKey)}>Remove</a></td>
            </tr>)}
          </tbody>
        </table>}
      </section>
    )
  }

  handleNewDeductionSubmit = event => {
    const { addDeduction } = this.props;
    const { newDeduction } = this.state;
    event.preventDefault()
    if (newDeduction.description && newDeduction.amountPaid) addDeduction(Object.assign({}, newDeduction))
  }
}

export default Deductions;