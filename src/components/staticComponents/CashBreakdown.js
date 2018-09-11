import React from 'react';

class CashBreakdown extends React.Component {
  render() {
    const { collectionTitle, cashData, updateCash } = this.props
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
            {Object.keys(cashData).sort((a, b) => Number(b) - Number(a)).map((denomination, index) =>
              <tr key={index}>
                <td>{`£${Number(denomination / 100).toFixed(2)}`}</td>
                <td>
                  <input
                    type='number'
                    value={cashData[denomination] || ''}
                    placeholder='0'
                    onChange={event => updateCash(collectionTitle, denomination, event)} />
                </td>
                <td style={{'minWidth': '120px'}}>£{(Number(denomination) * cashData[denomination] / 100).toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    )
  }
}

export default CashBreakdown;