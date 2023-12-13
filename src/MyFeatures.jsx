import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Styles/MyFeaturesStyles.css";

export default function MyFeatures() {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        axios.get("https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetAllFeatures")
            .then(resp => {
                setFeatures(resp.data);
            })
            .catch(err => {
                // Handle error if needed
            });

        return () => {
            // Cleanup if needed
        };
    }, []);

    const maprows = features.map(p => (
        <tr key={p.id}>
            <td>{p.entityName}</td>
            <td>{p.featureName}</td>
            <td>{p.value}</td>
            <td>{p.featureDataType}</td>
            <td>{p.createdAt}</td>
        </tr>
    ));

    return (
        <div className='table-container'>
            <br />
            <h1>All Features</h1>
            <table className='custom-table'>
                <thead>
                    <tr>
                        <th>Entity Name</th>
                        <th>Feature Name</th>
                        <th>Feature Value</th>
                        <th>Feature Type</th>
                        <th>Timestamp</th>
                      
                    </tr>
                </thead>
                <tbody>{maprows}</tbody>
            </table>
        </div>
    );
}
