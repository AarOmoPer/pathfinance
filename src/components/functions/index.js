import Moment from 'moment'

export const getNewCollectionObject = collectionTitle => Object.assign({}, {
  collectionTitle,
  contributors: [],
  breakdown: {
    cheque: {
      quantity: 0,
      value: 0
    },
    cash: {
      5000: 0,
      2000: 0,
      1000: 0,
      500: 0,
      200: 0,
      100: 0,
      50: 0,
      20: 0,
      10: 0,
      5: 0,
      2: 0,
      1: 0
    },
    card: {
      quantity: 0,
      value: 0
    }
  }
})

export const getCollectionTotal = collections => {
  const collectionTotal = {
    cheque: {quantity: 0, value: 0},
    cash: {
      breakdown: {
      5000: 0,
      2000: 0,
      1000: 0,
      500: 0,
      200: 0,
      100: 0,
      50: 0,
      20: 0,
      10: 0,
      5: 0,
      2: 0,
      1: 0},
      value: 0
    },
    card: {quantity: 0, value: 0}
  }
  for (const collection in collections){
    const col = collections[collection]
    collectionTotal.cheque.quantity += col.breakdown.cheque.quantity
    collectionTotal.cheque.value += col.breakdown.cheque.value
    collectionTotal.card.quantity += col.breakdown.card.quantity
    collectionTotal.card.value += col.breakdown.card.value
    for (const denomination in col.breakdown.cash){
      collectionTotal.cash.breakdown[denomination] += col.breakdown.cash[denomination]
      collectionTotal.cash.value += col.breakdown.cash[denomination] * Number(denomination)
    }
  }
  collectionTotal['combinedTotal'] = collectionTotal.cheque.value + collectionTotal.cash.value + collectionTotal.card.value
  return collectionTotal
}

export const getDeductionTotal = deductions => {
  let deductionTotal = 0
  for (const deduction in deductions){
    deductionTotal += deductions[deduction].value
  }
  return deductionTotal
}

export const getReportState = (reportData, reportDate=Moment().format('yyyy-MM-DD')) => ({
  reportDate: (reportData && reportData.reportDate) || reportDate,
  collections: (reportData && reportData.collections) || {},
  deductions: (reportData && reportData.deductions) || {},
})