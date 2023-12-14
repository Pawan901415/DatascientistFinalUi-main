import axios from 'axios';
import React, { useState } from 'react'
import AddedFeaturesTable from './AddedFeaturesTable';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function AddFeature(props) {

  const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
  const uname = storedUserObject.name;

  const [features, setFeatures] = useState({
    entityName: '',
    description: '',
    featureName: '',
    featureDataType: '', 
    value: '',
    username: '',
  });
 
  const [addedFeatures, setAddedFeatures] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const url = "https://featuremarketplacewebapi.azurewebsites.net/api/Feature/AddFeature";
 
  const handleChange = (evt) => {
    const { id, value } = evt.target;
    console.log('Entity Name value in handleChange:', value);
 
    setFeatures({
      ...features,
      [id]: value,
      featureDataType: id === "featureDataType" ? value : features.featureDataType,
      username: id === "value" ? uname : features.username
    });
  };
 
  const validateForm = () => {
    // Validation rules
    const validations = {
      entityName: {
        condition: (value) => {
          console.log('Entity Name value:', value);
          console.log('Entity Name length:', value?.length);
          return value !== undefined && value.length >= 3;
        },
        message: "Entity Name should have at least 3 characters",
      },
      description: {
        condition: (value) => value && value.split(" ").length >= 3,
        message: "Entity Description should have at least 3 words",
      },
      featureName: {
        condition: (value) => value.length >= 3,
        message: "Feature Name should have at least 3 characters",
      },
      featureDataType: {
        condition: (value) => value !== "",
        message: "Please select a Feature Type",
      },
      value: {
        condition: (value) => {
          switch (features.featureDataType) {
            case "int":
              return /^\d+$/.test(value);
            case "float":
              return /^\d+(\.\d+)?$/.test(value);
            case "string":
              return value.trim() !== "";
            case "double":
              return /^\d+(\.\d+)?$/.test(value);
            default:
              return true;
          }
        },
        message: "Feature Value is invalid",
      },
    };
 
    // Check each field against its validation rule
    for (const [field, validation] of Object.entries(validations)) {
      if (!validation.condition(features[field])) {
        alert(validation.message);
        return false;
      }
    
    }
 
    return true;
  };
  
 
  const handleClick = () => {
    if (!validateForm()) {
      return;
    }
    setAddedFeatures([...addedFeatures,{...features }]);
 
    setFeatures({
      entityName: features.entityName,
      description: features.description,
      featureName: '',
      featureDataType: '',
      value: '',
      username: uname,
    });
  };
 
 
  const handleUpdateAll = async () => {
    if (addedFeatures == null || addedFeatures.length === 0) {
      setShowErrorModal(true);
      return;
    }
 
    try {
      for (const feature of addedFeatures) {
        await axios.post(url, feature);
        //console.log("Feature added:", feature);
 
      }
 
      setShowSuccessModal(true);
      setAddedFeatures([]);
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
    }
  };
 
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
 
 
  return (
    <>
      <div className='h4 m-4 px-3 font-weight-bold'>Add New Feature</div>
      <div className='add-container display row'>
        <div className='col-md-6 px-5'>
          <div className='add-row'>
          {/* <div className='col-md-6 offset-md-3 col-lg-4 offset-lg-4'> */}
            <div className='form-group'>
              <label htmlFor='entityName'>Entity Name</label>
              <input
                type='text'
                className='form-control'
                id='entityName'
                maxLength='50'
                onChange={handleChange}
                value={features.entityName}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Entity Description</label>
              <input
                type='text'
                className='form-control'
                id='description'
                maxLength='200'
                onChange={handleChange}
                value={features.description}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='featureName'>Feature Name</label>
              <input
                type='text'
                className='form-control'
                id='featureName'
                maxLength='50'
                onChange={handleChange}
                value={features.featureName}
              />
            </div>
 
            <div className='form-group'>
              <label htmlFor='featureDataType'>Feature Type</label>
              <select
                className='form-control'
                id='featureDataType'
                onChange={handleChange}
                value={features.featureDataType}
              >
                <option value=''>Select Feature Type</option>
                <option value='int'>int</option>
                <option value='long'>long</option>
                <option value='float'>float</option>
                <option value='string'>string</option>
                <option value='double'>double</option>
                <option value='character'>character</option>
                <option value='boolean'>boolean</option>
                <option value='byte'>byte</option>
                <option value='bit'>bit</option>
              </select>
            </div>
 
            <div className='form-group'>
              <label htmlFor='value'>Feature Value</label>
              <input
                type='text'
                className='form-control'
                id='value'
                maxLength='50'
                onChange={handleChange}
                value={features.value}
              />
            </div>
            <div className='row mt-4 mb-4 m-2'>
              <button
                style={{ backgroundColor: '#6c757d' }}
                type='button'
                className='btn btn-primary'
                onClick={handleClick}
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>


        <div className='col-md-6'>
        <AddedFeaturesTable addedFeatures={addedFeatures} />
        <div className='row mt-4 mb-4 m-2 justify-content-center'>
          <button
            style={{ backgroundColor: '#6c757d',width: '150px' }}
            type='button'
            className='btn btn-success ml-2'
            onClick={handleUpdateAll}
          >
            Update All
          </button>
        </div>
        </div>
      </div>

       {/* Success Modal */}
       <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>All features added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Error updating features. Please add atleast one feature.</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      
      
    </>
  );
}



