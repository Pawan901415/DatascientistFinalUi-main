// import axios from 'axios';

// import React,{Profiler, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function SearchUser(props) {
    // let url = props.baseUrl1;
    // let [users,setUsers]=useState([]);
   

  return (
    <>
        
        {/* <div className='col-md-12 d-flex justify-content-end m-3 p-4'>
            <button type='button' className='btn btn-primary'>Upload Feature</button>&nbsp;
            <Link className='btn btn-warning' to="/newfeature">Add Feature</Link>
        </div> */}
        <br></br>
        <div className='col-md-5 offset-4 mx-auto'>
            <div className='input-group'>
                <span className='input-group-text'>Enter Feature</span>
                <input type='text' className='form-control'></input>
                <button type='button' className='btn btn-info'>Search</button>
            </div>
        </div>
        <br></br>
        
        
        <div >
        <div class="card w-50 mx-auto">
        <div class="card-body">
            <h5 class="card-title">feature1</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum ut tristique et egestas. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.</p>
            {/* <a href="#" class="btn btn-primary" to="/newfeature">Use Feature</a> */}
            <Link className='btn btn-outline-info' to="/viewfeature">View Feature</Link>
        </div>
        </div>
        <br></br>
        <div class="card w-50 mx-auto">
        <div class="card-body">
            <h5 class="card-title">feature2</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum ut tristique et egestas. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.</p>
            {/* <a href="#" class="btn btn-primary">Use Feature</a> */}
            <Link className='btn btn-outline-info' to="/viewfeature">View Feature</Link>
        </div>
        </div>
        <br></br>
        <div class="card w-50 mx-auto">
        <div class="card-body">
            <h5 class="card-title">feature3</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum ut tristique et egestas. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.</p>
            {/* <a href="#" class="btn btn-primary">Use Feature</a> */}
            <Link className='btn btn-outline-info' to="/viewfeature">View Feature</Link>
        </div>
        </div>
        </div>
    </>
  )
}
