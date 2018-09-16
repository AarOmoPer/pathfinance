import React from 'react';

function CollectionContributors(props) {
  const contributors = props.contributors
  return (
    <section>
      {contributors && !!Object.keys(contributors).length &&
        <section>
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Full name</th>
                <th>Amount paid</th>
                <th>Payment method</th>
                <th>Remove payment</th>
              </tr>
              {Object.keys(contributors).map((contributionKey, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{contributors[contributionKey].fullName}</td>
                  <td>{'£' + (contributors[contributionKey].amountPaid / 100).toFixed(2)}</td>
                  <td>{contributors[contributionKey].paymentMethod}</td>
                  <td ><a onClick={() => props.removeContribution(contributionKey)}>Remove</a></td>
                </tr>
              )}
            </tbody>
          </table>
        </section>}
    </section>
  )
}

export default CollectionContributors;