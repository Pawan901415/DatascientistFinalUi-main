import axios from 'axios';

import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function NewFeature(props) {

  let url = props.baseUrl1;

  let [user, setUser] = useState({});
  let [error, setError] = useState({});

  let Navigate = useNavigate();

  const handleChange = (evt) => {
    let { id, value } = evt.target;

    if (id === "Name") {
      if (value.length < 3) {
        setError({ ...error, [id]: "Name should be atleast 3 chars" })
      } else {
        setError({ ...error, [id]: "" })
      }

    } 
    setUser({ ...user, [id]: value });
  }

  const handleClick = () => {

    //console.log(product)
    axios.post(url, user).
      then(resp => {

      }).catch(er => {
        console.log(er);
      })
    Navigate('/SearchUser');
  }

  return (
    <>

      <div className='h5'>Add New Feature</div>
      <br></br>

      <div className='col-md-4 offset-4'>
      <div className='form-group'>
          <span>Entity Name</span>
          <input type='text' className='form-control'
            id="Name" maxLength="50" onChange={handleChange}></input>
          {error.Name !== "" ? <span className='text-danger'>{error.Name}</span> : ""}
        </div>
        <div className='form-group'>
          <span>Feature Name</span>
          <input type='text' className='form-control'
            id="Name" maxLength="50" onChange={handleChange}></input>
          {error.Name !== "" ? <span className='text-danger'>{error.Name}</span> : ""}
        </div>
        <br></br>
        <div className='form-group'>
          <span>Feature Type</span>
          <input type='text' className='form-control'
            id="Name" maxLength="50" onChange={handleChange}></input>
          {error.Name !== "" ? <span className='text-danger'>{error.Name}</span> : ""}
        </div>
        <br></br>
        <div className='form-group'>
          <span>Feature Value</span>
          <input type='text' className='form-control'
            id="Name" maxLength="50" onChange={handleChange}></input>
          {error.Name !== "" ? <span className='text-danger'>{error.Name}</span> : ""}
        </div>
        <br></br>
        {/* <div className='form-group'>
          <label for="myfile">Select a file:</label>&nbsp;&nbsp;
          <input type="file" id="myfile" name="myfile"></input>
          <br></br>
        </div> */}
        <div className='row mt-4 mb-4'>
          {/* <Link className="btn btn-primary" ></Link> */}
          <button type='button' className='btn btn-primary'
            onClick={handleClick} >Add Feature</button>

        </div>
      </div>

    </>
  )
}
