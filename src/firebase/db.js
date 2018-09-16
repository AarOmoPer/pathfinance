import {db} from './firebase';

export const createNewReport = reportDate => db.ref(`reports/${reportDate}`).set({reportDate})
export const getReportData = (reportDate, cb) => db.ref(`reports/${reportDate}`).on('value', snapshot => cb(snapshot.val()))

export const addCollection =  (reportDate, collectionTitle) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}`).set(generateNewCollectionObject(collectionTitle))
export const removeCollection = (reportDate, collectionTitle) => db.ref(`reports/${reportDate}/collections/${collectionTitle}`).remove()

export const addDeduction = (reportDate, deductionData) => db.ref(`reports/${reportDate}/deductions`).push({...deductionData})
export const removeDeduction = (reportDate, deductionKey) => db.ref(`reports/${reportDate}/deductions/${deductionKey}`).remove()

export const addContribution = (reportDate, collectionTitle, contributionData) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}/contributors`).push({...contributionData})
export const removeContribution = (reportDate, collectionTitle, contributionKey) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}/contributors/${contributionKey}`).remove()

export const updateCardCheque = (reportDate, collectionTitle, paymentMethod, prop, value) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}/breakdown/${paymentMethod}/${prop}`).set(value)
export const updateCash = (reportDate, collectionTitle, denomination, value) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}/breakdown/cash/${denomination}`).set(value)



const generateNewCollectionObject = collectionTitle => Object.assign({}, {
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