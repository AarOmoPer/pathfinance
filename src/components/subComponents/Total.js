import React from 'react';
import { getCollectionTotal, getDeductionTotal } from '../functions'
import { CashBreakdown } from '../staticComponents'

function Total(props) {
  const { collections, deductions } = props
  const collectionTotal = getCollectionTotal(collections)
  const deductionTotal = getDeductionTotal(deductions)
  const toBank = collectionTotal.combinedTotal - deductionTotal
  return (
    <section>
      <p>Collection total - £{(collectionTotal.combinedTotal / 100).toFixed(2)}</p>
      <ul>
        <li>Cheque: {collectionTotal.cheque.quantity} cheques payments worth £{(collectionTotal.cheque.value / 100).toFixed(2)}</li>
        <li><section>
          Cash: £{(collectionTotal.cash.value / 100).toFixed(2)}
          <CashBreakdown cashData={collectionTotal.cash.breakdown} isReadOnly={true}/>
        </section></li>
        <li>Card: {collectionTotal.card.quantity} card payments worth £{(collectionTotal.card.value / 100).toFixed(2)}</li>
      </ul>

      <p>Deduction total - £{(deductionTotal / 100).toFixed(2)}</p>

      <p>Amount going to bank - £{(toBank / 100).toFixed(2)}</p>
    </section>
  )
}

export default Total