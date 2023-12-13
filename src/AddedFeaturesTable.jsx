// AddedFeaturesTable.jsx
import React from 'react';
 
function AddedFeaturesTable({ addedFeatures }) {
  return (
    <div >
      <h2>Recently Added Features</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Entity Name</th>
            <th>Description</th>
            <th>Feature Name</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {addedFeatures.map(feature => (
            <tr key={feature.id}>
              <td>{feature.entityName}</td>
              <td>{feature.description}</td>
              <td>{feature.featureName}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default AddedFeaturesTable;