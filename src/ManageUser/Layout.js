import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FeatureHome from "./FeatureHome";
import ViewFeature from "./ViewFeature"
import SearchUser from './SearchUser';
import NewFeature from './NewFeature';
//import EditFeature from './EditFeature';
import PageNotFound from './PageNotFound';
export default function Layout() {
  let [role, setRole] = useState(1);
  let [username, setUsername] = useState("Admin");
  let [baseUrl, setBaseUrl] = useState("")
  let [baseUrl1, setBaseUrl1] = useState("")
  return (
    <BrowserRouter>
      <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Feature Marketplace</a>
           
            
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            {/* <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            <div className='col-md-4 offset-1'>
            <div className='input-group'>
                <button type='button' className='btn btn-info'>Search</button>
                <input type='text' className='form-control'></input>
            </div>
            </div>
              <ul class="navbar-nav offset-1">
                <li class="nav-item">
                  <Link class="nav-link active"
                    aria-current="page" to="searchuser">Custom Search</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active"
                    aria-current="page" to="newfeature">Add Feature</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active"
                    aria-current="page" to="featurehome">Upload Feature</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active"
                    aria-current="page" to="featurehome">Favourites</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active"
                    aria-current="page" to="featurehome">My Features</Link>
                </li>
              </ul>
             
            </div>
          </div>
        </nav>
        
      </>

      <Routes>
        <Route path='/' element={<FeatureHome></FeatureHome>} ></Route>
        <Route path='/searchuser' element={<SearchUser ></SearchUser>} ></Route>
        <Route path='newfeature' element={<NewFeature ></NewFeature>} ></Route>
        <Route path='viewfeature' element={<ViewFeature></ViewFeature>} ></Route>

      </Routes>

    </BrowserRouter>
  )
}
