import React from 'react';
import './Styles/FeatureHome.css';
import "./ViewEntity";
import Footer from './Components/Footer';
import CustomSearch from './CustomSearch';
import AddFeature from './AddFeature';
import MyFavorites from './MyFavorites';
import CsvUploader from './CsvUploader';
import UserFeatures from './UserFeatures';
import SearchResult from './SearchResult';
import ViewEntity from './ViewEntity';
import EditEntity from './EditEntity';
import EditFeature from './EditFeature';
import Header from './Header';
//import { Switch } from '@mui/material';
import { Routes, Route, Outlet } from 'react-router-dom';
import FeatureHomeDefault from './FeatureHomeDefault';


const FeatureHome = () => {
  console.log("Rendering FeatureHome component");
  return (
    <>
      <Header></Header>   
      <Routes>
        <Route path="Addfeature" element={<AddFeature />} />
        <Route path="CsvUploader" element={<CsvUploader />} />
        <Route path="customsearch" element={<CustomSearch />} />
        <Route path="searchresult" element={<SearchResult />} />
        <Route path="userfeatures" element={<UserFeatures />} />
        <Route path="viewentity/:id" element={<ViewEntity />} />
        <Route path="editentity/:id" element={<EditEntity />} />
        <Route path="editfeature/:id" element={<EditFeature />} />
        <Route path='MyFavorites' element={<MyFavorites />} />
        <Route path="*" element={<FeatureHomeDefault></FeatureHomeDefault>}></Route>

      </Routes>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default FeatureHome;
