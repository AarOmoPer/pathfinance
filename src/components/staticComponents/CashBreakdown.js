import React from 'react';

class CashBreakdown extends React.Component {
  render() {
    const { collectionTitle, breakdown, updateCashBreakdown } = this.props
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Units</th>
              <th>Quantity</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map((denomination, index) =>
              <tr key={index}>
                <td>{`£${denomination.value.toFixed(2)}`}</td>
                <td>
                  <input
                    type='number'
                    value={denomination.quantity || ''}
                    placeholder='0'
                    onChange={event => updateCashBreakdown(collectionTitle, index, event)} />
                </td>
                <td style={{'minWidth': '120px'}}>{(denomination.value * denomination.quantity).toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    )
  }
}

export default CashBreakdown;