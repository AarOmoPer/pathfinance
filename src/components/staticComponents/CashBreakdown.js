import React from 'react';

function CashBreakdown(props) {
  const { cashData, updateCash , isReadOnly = false} = props
  return(
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
                  {
                    isReadOnly 
                     ? <input value={cashData[denomination]} readOnly/>
                     :<input
                       type='number'
                       value={cashData[denomination] || ''}
                       placeholder='0'
                       onChange={event => updateCash(denomination, event)} />
                  }
                </td>
                <td style={{'minWidth': '120px'}}>£{(Number(denomination) * cashData[denomination] / 100).toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
  )
}

export default CashBreakdown;