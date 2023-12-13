import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import home from "./home.svg"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Styles/Header.css";
import {AppConfigurationClient} from "@azure/app-configuration";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import SearchResult from './SearchResult';
import LogoutButton from './Login/LogoutButton';




const configService = new AppConfigurationClient("Endpoint=https://featureflagg.azconfig.io;Id=ZRhl;Secret=DQYToBUHpPfxFayGC/ZB7P9OvQE+qf77h6Uoe35CuPg=");

  
export default function Header() {

  const [featureFlags, setFeatureFlags]=useState({
    addFeature:false,
    uploadFeature:false,
    favourites:false,
    myFeature:false,
    customSearch:false,
   });
 
    const fetchFeatureFlags = async () => {
      try {
        const addFeatureResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/addFeature',
        });
        const uploadFeatureResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/uploadFeature',
        });
        const favouritesResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/favourites',
        });
        const myFeatureResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/myFeature',
        });
        const customSearchResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/customSearch',
        });
        setFeatureFlags({
          addFeature: JSON.parse(addFeatureResponse?.value)?.enabled === true,
          uploadFeature: JSON.parse(uploadFeatureResponse?.value)?.enabled === true,
          favourites: JSON.parse(favouritesResponse?.value)?.enabled === true,
          myFeature: JSON.parse(myFeatureResponse?.value)?.enabled === true,
          customSearch: JSON.parse(customSearchResponse?.value)?.enabled === true,
        });
      } catch (error) {
        console.error('Error fetching feature flags:', error);
      }
    };
    useEffect(() => {
    fetchFeatureFlags();
     // Polling every 5 seconds (adjust as needed)
     const pollingInterval = setInterval(fetchFeatureFlags, 1000);
     return () => clearInterval(pollingInterval);
  }, []);
 
  
  const [searchResults, setSearchResults] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false); // New state
  const navigate = useNavigate();
  const location = useLocation();
  
  async function SearchAPI() {
    const response = await axios.get(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/GetEntityByEntityName/${searchTerm}`);
    setSearchResults(response.data);
    console.log(response.data);
    navigate('/featurehome/searchresult');
    setShowSearchResults(true); // Update state to show search results

  }

  function HandleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  

  // const renderSearchResult = ((searchResults.length > 0 ) && (<SearchResult data={searchResults} />));

  return (
    
      <>
        <Navbar expand="lg" className="custom-orange-bg">
          <Container fluid>
            <Link to="/featurehome">
            <img src={home} alt='home'/> 
            </Link>
            &nbsp; &nbsp;
            <Link to="/featurehome" style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{ color: 'white', fontWeight: 'bolder'}}>Feature Marketplace</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
            
            {featureFlags.addFeature?(
                <Link to="/featurehome/AddFeature" style={{ textDecoration: 'none' }}>
                  <Nav.Item id='navlinks'>Add Features</Nav.Item>
                </Link>
              ):(
                <p></p>
              )}
                
              {featureFlags.uploadFeature?( 
                <Link to="/featurehome/CsvUploader" style={{ textDecoration: 'none' }}>
                <Nav.Item id='navlinks'>Upload Features</Nav.Item>
                </Link>
                  ):(
                  <p></p>
                )} 
               

                {featureFlags.favourites?(
                
                <Link to="/featurehome/MyFavorites" style={{ textDecoration: 'none' }}>
                <Nav.Item  id='navlinks'>Favourites</Nav.Item> 
                </Link>             
                 ):(
                  <p></p>
                ) }
            
             {featureFlags.myFeature?(
              <Link to="/featurehome/UserFeatures" style={{ textDecoration: 'none' }}>
                <Nav.Item id='navlinks'>My Features</Nav.Item>
                </Link>       
                   ):(
                  <p></p>
                )} 

           {featureFlags.customSearch?( 
                <Link to="/featurehome/CustomSearch" style={{ textDecoration: 'none' }}>
                <Nav.Item id='navlinks'>Custom Search</Nav.Item>
                </Link>
           ):(
                  <p></p>
                )}    
             
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search Entities..."
                  className="me-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={HandleInputChange}
                />
                  <Button
                    style={{ color: 'white' }}
                    variant="outline-success"
                    onClick={SearchAPI}
                    className="btn btn-secondary"
                  >
                    Search
                  </Button>
              </Form>
              &nbsp;  &nbsp;
              
              <LogoutButton></LogoutButton>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {location.pathname.includes('/featurehome/searchresult') && showSearchResults && (
        <div className="search-results-container">
          <SearchResult data={searchResults} />
        </div>
      )}
    
        {/* {showSearchResults > 0 && <SearchResult data={searchResults}/>} */}
        
        {/* <SearchResult data={searchResults}  recentSearches={recentSearches}/> */}
      </>
      
    
  )
}
