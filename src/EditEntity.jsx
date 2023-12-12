import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/FeatureHome.css';
import './Styles/ViewEntity.css';
import './Styles/EditEntityStyles.css';
import React, { useState, useEffect} from 'react';
 
export default function EditEntity(props) {
  const { id } = useParams(); // Access the 'id' parameter
  const navigate = useNavigate();
 
  const [entityDetails, setEntityDetails] = useState({});
  const [features, setFeatures] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedEntity, setEditedEntity] = useState({ entityName: '', description: '' });
 
  useEffect(() => {
    // Fetch entity details
    axios.get(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/GetEntityByEntityName/${id}`)
      .then(resp => {
        setEntityDetails(resp.data);
        console.log(resp.data);
      })
      .catch(err => {
        console.error('API Error:', err);
      });
 
    // Fetch features based on the entity name
    axios.get(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetFeaturesByEntityName/${id}`)
      .then(resp => {
        setFeatures(resp.data);
        console.log(resp.data);
      })
      .catch(err => {
        console.error('API Error:', err);
      });
 
    return () => {
 
    };
  }, [id]);
 
  const handleEdit = () => {
    // Open edit mode
    setEditedEntity({ entityName: entityDetails.entityName, description: entityDetails.description });
    setEditMode(true);
  };
 
  const handleSave = () => {
    // Save changes using the update API
    axios.put(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/UpdateEntity/${entityDetails.entityName}`, editedEntity)
      .then(resp => {
        setEntityDetails(resp.data);
        setEditMode(false);
      })
      .catch(err => {
        console.error('API Error:', err);
      });
  };
 
  const handleDelete = () => {
    // Delete entity using the delete API
    axios.delete(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/DeleteEntity/${entityDetails.entityName}`)
      .then(() => {
        // Redirect to a different page or perform any other action after successful deletion
        navigate('/'); // Redirect to the home page, for example
      })
      .catch(err => {
        console.error('API Error:', err);
      });
  };
 
  let maptitle = (
<div className="entity-containerr">
      {editMode ? (
    <div className="edit-modee">
    {/* <input
            type="text"
            value={editedEntity.entityName}
            onChange={(e) => setEditedEntity({ ...editedEntity, entityName: e.target.value })}
          /> */}
      <h3 className="edit-entity-namee">{editedEntity.entityName}</h3>
          <input
            className="edit-descriptionn"
            type="text"
            value={editedEntity.description}
            onChange={(e) => setEditedEntity({ ...editedEntity, description: e.target.value })}
          />
          <button className='save-buttonn' onClick={handleSave}>Save</button>
          {/* <button onClick={handleDelete}>Delete</button> */}
        </div>
      ) : (
        <div className="view-modee">
      <h2 className="entity-namee">{entityDetails.entityName}</h2>
          <p>{entityDetails.description} <span onClick={handleEdit} style={{ cursor: 'pointer' }}>✏️</span></p>
          <button className="delete-buttonn" onClick={handleDelete}>Delete entity</button>
        </div>
      )}
    </div>
  );
 
  let maprows = features.map(p => (
    <tr key={p.featureName}>
      <td>{p.featureName}</td>
      <td>{p.value}</td>
      <td>{p.featureDataType}</td>
      <td>{p.createdAt}</td>
    </tr>
  ));
 
  return (
    <>
      <div className='.container view-entity'>
        {maptitle}
 
        <br></br>
 
        <h4>Features listed in this Entity.</h4>
 
        <div className="landing-page">
          <div className="table-container">
            <div className='table-responsive'>
              <table className='table table-striped table-bordered table-hover' style={{ border: "1px solid black" }}>
                <thead>
                  <tr>
                    <th>Feature Name</th>
                    <th>Feature Value</th>
                    <th>Feature Type</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {maprows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 