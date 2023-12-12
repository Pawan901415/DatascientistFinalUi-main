import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyEntities from './MyEntities';
import PieChartComponent from './Components/PieChartComponent';

export default function UserFeatures() {
    const [features, setFeatures] = useState([]);

    const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
    const username = storedUserObject.name;
    useEffect(() => {
        axios.get(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/GetFeaturesByUserName/${username}`)
            .then(resp => {
                setFeatures(resp.data);
                console.log(resp.data);
            })
            .catch(err => {
                // Handle error
            });
    
        return () => {
            // Cleanup, if needed
        };
    }, [username]);
    

    const handleDeleteClick = (featureId, featureName) => {
        const shouldDelete = window.confirm(`Delete the feature "${featureName}"?`);

        if (shouldDelete) {
            axios.delete(`https://featuremarketplacewebapi.azurewebsites.net/api/Feature/DeleteFeature/${featureId}`)
                .then(() => {
                    // Remove the deleted feature from the state
                    setFeatures(prevFeatures => prevFeatures.filter(feature => feature.id !== featureId));
                    window.location.reload();
                    alert("Feature deleted successfully");

                    
                })
                .catch(err => {
                    // Handle error
                    console.error("Error deleting feature", err);
                });
        }
    }

    const maprows = features.map(p => (
        <tr key={p.id}>
            <td className="text-nowrap text-center ">{p.entityName}</td>
            <td className="text-nowrap text-center ">{p.featureName}</td>
            <td className="text-nowrap text-center ">{p.value}</td>
            <td className="text-nowrap text-center ">{p.featureDataType}</td>
            <td className="text-nowrap text-center ">{p.createdAt}</td>
            <td className="text-nowrap text-center ">
                <Link className='btn btn-primary' to={`/featurehome/editfeature/${p.entityName}`}>Edit</Link>
            </td>
            <td className="text-nowrap text-center ">
                <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(p.featureId, p.featureName)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <br />
            {/* <div className='container'> */}
                <MyEntities />
                <br/>

                <PieChartComponent></PieChartComponent>
                <br></br>

                <h2 className="text-left">My Features</h2>
                <div className="table-container">
                 <div className='table-responsive'>
                  <table className='table table-striped table-bordered table-hover' style={{ border: "1px solid black" }}>
                        <thead>
                            <tr>
                                <th className="text-nowrap text-center ">Entity Name</th>
                                <th className="text-nowrap text-center ">Feature Name</th>
                                <th className="text-nowrap text-center ">Feature Value</th>
                                <th className="text-nowrap text-center ">Feature Type</th>
                                <th className="text-nowrap text-center ">Timestamp</th>
                                <th className="text-nowrap text-center ">Edit</th>
                                <th className="text-nowrap text-center ">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maprows}
                        </tbody>
                    </table>
                  </div>
                </div>
            {/* </div> */}
        </>
    );
}