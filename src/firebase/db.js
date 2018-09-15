import {db} from './firebase';

export const createNewReport = reportDate => db.ref(`reports/${reportDate}`).set({reportDate})

export const getReportData = (reportDate, cb) => db.ref(`reports/${reportDate}`).on('value', snapshot => cb(snapshot.val()))

export const addCollection =  (reportDate, collectionTitle) => db.ref(`reports/${reportDate}/collections/${collectionTitle}`).set(generateNewCollectionObject(collectionTitle))

export const addDeduction = (reportDate, deductionData) => db.ref(`reports/${reportDate}/deductions`).push({...deductionData})






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