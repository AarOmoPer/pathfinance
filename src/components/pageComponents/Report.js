import React from 'react';
import Moment from 'moment';
import { db, auth } from '../../firebase'
import { Collection, Deduction, Total } from '../subComponents'
import { Authorization } from '../higherOrderComponents'
import { withRouter } from 'react-router-dom'

class Report extends React.Component {
  state = {
    newCollection: {
      title: 'Offering',
    },
    newDeduction: {
      description: 'Transport',
      value: 2500
    },
    isVisible: {
      collection: true,
      deduction: false,
      total: false
    },
    // this prop will be used to flip between viewing and editing the report
    reportIsReadOnly: false,
    collectionView: 'showCosy',

    reportDate: Moment().format("YYYY-MM-DD"),
    collections: {},
    deductions: [],
  }

  componentDidMount() {
    const { reportDate } = this.state
    db.getReportData(reportDate, reportData => this.setState({ ...this.formatReportData(reportData) }))
  }

  render() {
    const { newCollection, newDeduction, reportDate, collections, deductions, isVisible, collectionView } = this.state
    console.log(collectionView)
    return (
      <Authorization>
        <section className="hero is-fullheight">
          <section className="columns">
            <section className="column is-narrow is-hidden-touch is-fixed no-print">
              <section className="section" style={{ width: "260px" }}>
                <aside className="menu">
                  <h3 className="title is-large is-size-3 has-text-grey">Pathfinance</h3>
                  <p>Hello, {"Joshua"}</p>
                  <p class="menu-label">
                    Report date
                  </p>
                  <input className="input" type='date' value={reportDate} onChange={this.handleReportDateChange} />
                  <p class="menu-label">
                    Components
                  </p>
                  <ul class="menu-list">
                    <li>
                      <ul>
                        <li><a className={isVisible.collection && "has-text-info"} onClick={() => this.handleVisibility('collection')}>Collections</a></li>
                        <li><a className={isVisible.deduction && "has-text-info"} onClick={() => this.handleVisibility('deduction')}>Deductions</a></li>
                        <li><a className={isVisible.total && "has-text-info"} onClick={() => this.handleVisibility('total')}>Total</a></li>
                      </ul>
                    </li>
                  </ul>
                  <hr />
                  <a className='' onClick={auth.signOut}>Sign out</a>
                </aside>
              </section>
            </section>
            <section className="column is-hidden-touch is-2 no-print"></section>
            <section className='column is-hidden-desktop'>
              <h3 className="title is-large is-size-3 has-text-grey">Pathfinance</h3>
              <section className='container'>
                <input className="input" type='date' value={reportDate} onChange={this.handleReportDateChange} />
              </section>
              <br />
              <section className='field is-grouped is-grouped-right'>
                <p className='control'>
                  <a className={`button is-small ${isVisible.collection && "is-dark"}`} onClick={() => this.handleVisibility('collection')}>Collections</a>
                </p>
                <p className='control'>
                  <a className={`button is-small ${isVisible.deduction && "is-dark"}`} onClick={() => this.handleVisibility('deduction')}>Deductions</a>
                </p>
                <p className='control'>
                  <a className={`button is-small ${isVisible.total && "is-dark"}`} onClick={() => this.handleVisibility('total')}>Total</a>
                </p>
              </section>
            </section>
            <section className="column ">
              <section className='section'>
                <section className='title'>
                  <h2 className="title has-text-right is-size-4 has-text-grey">{Moment(reportDate).format('dddd, MMMM Do YYYY')}</h2>
                </section>
                {isVisible.collection && <section className="box">
                  <h3 className="subtitle">Collections</h3>
                  <section className="title no-print">
                    <section className="field">
                      <section className="control">
                        <input className="input" type='text' placeholder='Collection title' value={newCollection.title} onChange={this.handleNewCollectionPropChange} />
                      </section>
                    </section>
                    <section className="field">
                      <p className="control">
                        <button className="button is-dark" onClick={this.addCollection}>Add collection</button>
                      </p>
                      <br />
                      <p className="control">
                        <section className="select">
                          <select onChange={this.handleCollectionView}>
                            {Object.keys(collections).map(collectionKey => <option value={collectionKey}>{collections[collectionKey]['collectionTitle']}</option>)}
                            <option value='showCosy'>Show all cosy</option>
                            <option value='showWide'>Show all wide</option>
                          </select>
                        </section>
                      </p>
                    </section>
                  </section>
                  <section className="">
                    {(collectionView === "showCosy" || collectionView === "showWide")
                      ? <section className={collectionView === "showCosy" && "columns is-multiline"}>
                        {Object.values(collections).map((collection, index) => <section className={`column ${collectionView === "showCosy" && "is-one-third"}`}>
                          <Collection key={index} {...collection} reportDate={reportDate} removeCollection={this.removeCollection} />
                        </section>
                        )}
                      </section>
                      : <section className=''>
                        <Collection {...collections[collectionView]} reportDate={reportDate} removeCollection={this.removeCollection} />
                      </section>
                    }
                  </section>
                </section>
                }
                {isVisible.deduction && <section className="box">
                  <h3 className="subtitle">Deductions</h3>
                  <section className="title no-print">
                    <section className="field">
                      <section className="control">
                        <input className="input" value={newDeduction.description} onChange={event => this.handleNewDeductionPropChange('description', event)} placeholder='description' />
                      </section>
                    </section>

                    <div class="field is-horizontal">
                      <div class="field-body">
                        <div class="field is-expanded">
                          <div class="field has-addons">
                            <p class="control">
                              <a class="button is-static">
                                £
                              </a>
                            </p>
                            <p class="control is-expanded">
                              <input type='number' className="input" value={newDeduction.value / 100 || ''} onChange={event => this.handleNewDeductionPropChange('value', event)} placeholder='amount paid' />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <section className="field">
                      <section className="control">
                        <button className="button is-dark" type='button' onClick={this.addDeduction}>Add deduction</button>
                      </section>
                    </section>
                  </section>

                  <section>
                    {deductions && !!Object.keys(deductions).length && <Deduction deductionData={deductions} removeDeduction={this.removeDeduction} />}
                  </section>
                </section>
                }
                {isVisible.total && <section className="box">
                  <h3 className="subtitle">Total</h3>
                  <section className="content">
                    <Total collections={collections} deductions={deductions} />
                  </section>
                </section>}
              </section>
            </section>
          </section>
        </section>
      </Authorization>
    )
  }

  handleCollectionView = event => this.setState({ collectionView: event.target.value })

  handleVisibility = prop => {
    const { isVisible } = this.state;
    isVisible[prop] = !isVisible[prop];
    this.setState({ isVisible })
  }

  handleReportDateChange = event => {
    const oldReportDate = this.state.reportDate
    const newReportDate = event.target.value
    db.stopReportData(oldReportDate)
    db.getReportData(newReportDate, reportData => this.setState({ ...this.formatReportData(reportData) }))
    this.setState({ reportDate: newReportDate })
  }

  handleNewCollectionPropChange = event => {
    const { newCollection } = this.state;
    newCollection.title = event.target.value;
    this.setState({ newCollection })
  }
  handleNewDeductionPropChange = (prop, event) => {
    const { newDeduction } = this.state;
    newDeduction[prop] = prop === 'value' ? Number(event.target.value) * 100 : event.target.value;
    this.setState({ newDeduction })
  }

  addCollection = event => {
    event.preventDefault()
    const { newCollection, reportDate } = this.state;
    db.addCollection(reportDate, newCollection.title)
  }
  removeCollection = collectionTitle => {
    const { reportDate } = this.state
    db.removeCollection(reportDate, collectionTitle.toLowerCase())
  }

  addDeduction = event => {
    event.preventDefault()
    const { newDeduction, reportDate } = this.state;
    db.addDeduction(reportDate, newDeduction)
  }
  removeDeduction = deductionKey => {
    const { reportDate } = this.state
    db.removeDeduction(reportDate, deductionKey)
  }

  formatReportData = reportData => {
    const { collections, deductions } = reportData || {};
    return {
      collections: collections || {},
      deductions: deductions || {}
    }
  }
}

export default withRouter(Report);