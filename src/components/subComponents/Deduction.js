import React from 'react';

class Deductions extends React.Component {
  render() {
    const { deductionData, removeDeduction} = this.props
    return (
      <section>
        
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
              <td>{deduction.value}</td>
              <td onClick={removeDeduction}>Remove</td>
            </tr>)}
          </tbody>
        </table>
        <hr />
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