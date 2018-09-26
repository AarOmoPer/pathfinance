import {db} from './firebase';
import {getNewCollectionObject} from '../components/functions'

export const createNewReport = reportDate => db.ref(`reports/${reportDate}`).set({reportDate})
export const getReportData = (reportDate, cb) => db.ref(`reports/${reportDate}`).on('value', snapshot => cb(snapshot.val()))
export const stopReportData = reportDate => db.ref(`reports/${reportDate}`).off()

export const addCollection =  (reportDate, collectionTitle) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}`).set(getNewCollectionObject(collectionTitle))
export const removeCollection = (reportDate, collectionTitle) => db.ref(`reports/${reportDate}/collections/${collectionTitle}`).remove()

export const addDeduction = (reportDate, deductionData) => db.ref(`reports/${reportDate}/deductions`).push({...deductionData})
export const removeDeduction = (reportDate, deductionKey) => db.ref(`reports/${reportDate}/deductions/${deductionKey}`).remove()

export const addContribution = (reportDate, collectionTitle, contributionData) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}/contributors`).push({...contributionData})
export const removeContribution = (reportDate, collectionTitle, contributionKey) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}/contributors/${contributionKey}`).remove()

export const updateCardCheque = (reportDate, collectionTitle, paymentMethod, prop, value) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}/breakdown/${paymentMethod}/${prop}`).set(value)
export const updateCash = (reportDate, collectionTitle, denomination, value) => db.ref(`reports/${reportDate}/collections/${collectionTitle.toLowerCase()}/breakdown/cash/${denomination}`).set(value)
