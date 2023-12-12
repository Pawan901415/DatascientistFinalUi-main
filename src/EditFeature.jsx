import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFeature = () => {
    const { entityName } = useParams();
    const [featureData, setFeatureData] = useState({
        featureName: '',
        value: '',
        featureDataType: '',
    });

    useEffect(() => {
        axios.get(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetFeaturesByEntityName/${entityName}`)
            .then(resp => {
                setFeatureData(resp.data);
            })
            .catch(err => {
                console.error('Error fetching feature data', err);
            });
    }, [entityName]);

    const handleEditFeature = () => {
        axios.put(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/UpdateFeature/${entityName}`, featureData)
            .then(resp => {
                console.log('Feature updated successfully', resp.data);
            })
            .catch(err => {
                console.error('Error updating feature', err);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Edit Feature</h2>
            <div className="mb-3">
                <label htmlFor="entityName" className="form-label">Feature Name:</label>
                <input
                    type="text"
                    id="entityName"
                    className="form-control"
                    value={featureData.featureName}
                    onChange={e => setFeatureData({ ...featureData, featureName: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="featureId" className="form-label">Feature Name:</label>
                <input
                    type="text"
                    id="featureId"
                    className="form-control"
                    value={featureData.featureName}
                    onChange={e => setFeatureData({ ...featureData, featureName: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="featureName" className="form-label">Feature Name:</label>
                <input
                    type="text"
                    id="featureName"
                    className="form-control"
                    value={featureData.featureName}
                    onChange={e => setFeatureData({ ...featureData, featureName: e.target.value })}
                />
            </div>
           
            <div className="mb-3">
                <label htmlFor="featureDataType" className="form-label">Feature Name:</label>
                <input
                    type="text"
                    id="featureDataTypee"
                    className="form-control"
                    value={featureData.featureName}
                    onChange={e => setFeatureData({ ...featureData, featureName: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="value" className="form-label">Feature Name:</label>
                <input
                    type="text"
                    id="value"
                    className="form-control"
                    value={featureData.featureName}
                    onChange={e => setFeatureData({ ...featureData, featureName: e.target.value })}
                />
            </div>
            
            <button className="btn btn-primary" onClick={handleEditFeature}>Save Changes</button>
        </div>
    );
};

export default EditFeature;
